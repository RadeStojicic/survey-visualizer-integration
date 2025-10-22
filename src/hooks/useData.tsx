import type { CategoriesResponse, QuestionsResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useData = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    fetchCategories();
  }, [isMounted]);

  const apiTimeout = () => {
    setIsTimedOut(true);
    setTimeout(() => setIsTimedOut(false), 5000);
  };

  const fetchCategories = async () => {
    if (!isMounted) return;

    try {
      setLoading(true);
      setError(null);

      const cachedCategories = localStorage.getItem("opentdbCategories");
      if (cachedCategories) {
        const parsed = JSON.parse(cachedCategories);
        setCategories(parsed);
        setLoading(false);
        return;
      }
      if (isTimedOut) return;
      apiTimeout();
      const categoriesResponse = await fetch(
        "https://opentdb.com/api_category.php",
      );
      if (!categoriesResponse.ok) {
        throw new Error("Failed to fetch categories");
      }

      const categoriesJSON = await categoriesResponse.json();
      localStorage.setItem("opentdbCategories", JSON.stringify(categoriesJSON));
      setCategories(categoriesJSON);
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

  const fetchData = async () => {
    if (!isMounted) return;
    try {
      setLoading(true);
      setError(null);

      if (isTimedOut) return;

      apiTimeout();
      const questionsResponse = await fetch(
        "https://opentdb.com/api.php?amount=50",
      );
      if (!questionsResponse.ok) throw new Error("Failed to fetch data");

      const questions = await questionsResponse.json();

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
      setSelectedCategory("all");
    }
  };

  return {
    fetchData,
    fetchCategories,
    categories,
    loading,
    isTimedOut,
    apiTimeout,
    setLoading,
    questions,
    error,
    selectedCategory,
    setSelectedCategory,
  };
};
