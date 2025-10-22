import type { CategoriesResponse, QuestionsResponse } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import CategoryChart from "./survey/CategoryChart";
import CategoryFilter from "./survey/CategoryFilter";
import DifficultyChart from "./survey/DifficultyChart";
import Header from "./survey/Header";
import Spinner from "./survey/Spinner";

const Survey = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedData = localStorage.getItem("quizData");
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setQuestions(parsed.questions);
        setCategories(parsed.categories);
        setLoading(false);
        return;
      }

      const [questionsResponse, categoriesResponse] = await Promise.all([
        fetch("https://opentdb.com/api.php?amount=50"),
        fetch("https://opentdb.com/api_category.php"),
      ]);

      if (!questionsResponse.ok || !categoriesResponse.ok)
        throw new Error("Failed to fetch data");

      const questions = await questionsResponse.json();
      const categories = await categoriesResponse.json();

      localStorage.setItem(
        "quizData",
        JSON.stringify({ questions, categories }),
      );

      setQuestions(questions);
      setCategories(categories);
    } catch (err) {
      if (err instanceof Error && err.message.includes("429")) {
        setError(
          "Rate limit exceeded. Please wait a few seconds and try again.",
        );
      } else {
        setError("Something went wrong while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCacheAndRefresh = async () => {
    localStorage.removeItem("quizData");
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 5000);
  };

  const filteredQuestions = useMemo(
    () =>
      selectedCategory === "all"
        ? questions?.results || []
        : questions?.results.filter((q) => q.category === selectedCategory) ||
          [],
    [questions, selectedCategory],
  );

  const uniqueCategories = useMemo(
    () =>
      [...new Set((questions?.results || []).map((q) => q.category))].sort(),
    [questions],
  );

  return (
    <div className="min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : questions && categories ? (
            <div className="container mx-auto text-left">
              <div className="mb-4 bg-white/50 p-8">
                <Header onRefresh={clearCacheAndRefresh} />
                <CategoryFilter
                  uniqueCategories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  questions={questions}
                />
                <CategoryChart questions={filteredQuestions} />
                <DifficultyChart questions={filteredQuestions} />
              </div>
            </div>
          ) : (
            <div className="text-text/50 text-center">No data available.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Survey;
