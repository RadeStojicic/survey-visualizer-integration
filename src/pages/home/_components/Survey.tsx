import { useData } from "@/hooks/useData";
import { useMemo } from "react";
import CategoryChart from "./survey/CategoryChart";
import CategoryFilter from "./survey/CategoryFilter";
import DifficultyChart from "./survey/DifficultyChart";
import Header from "./survey/Header";
import Spinner from "./survey/Spinner";

const Survey = () => {
  const {
    categories,
    error,
    isTimedOut,
    fetchData,
    loading,
    questions,
    selectedCategory,
    setSelectedCategory,
    setLoading,
  } = useData();

  const clearCacheAndRefresh = async () => {
    setLoading(true);
    fetchData();
  };

  const filteredQuestions = useMemo(
    () =>
      selectedCategory === "all"
        ? questions?.results || []
        : questions?.results.filter((q) => q.category === selectedCategory) ||
          [],
    [questions, selectedCategory],
  );

  const uniqueCategories = useMemo(() => {
    if (!questions) {
      return [
        ...new Set((categories?.trivia_categories || []).map((c) => c.name)),
      ].sort();
    }

    return [
      ...new Set((questions?.results || []).map((q) => q.category)),
    ].sort();
  }, [categories, questions]);

  return (
    <div className="min-h-screen">
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : categories ? (
        <div className="container mx-auto text-left">
          <div className="mb-4 w-full bg-white/50 p-8">
            <Header onRefresh={clearCacheAndRefresh} timedOut={isTimedOut} />
            {!loading || categories ? (
              <CategoryFilter
                uniqueCategories={uniqueCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                questions={questions}
              />
            ) : (
              <div className="border-secondary bg-secondary/30 mb-6 rounded-lg border p-4">
                <Spinner /> Loading categories...
              </div>
            )}

            {!loading ? (
              questions ? (
                <>
                  <CategoryChart questions={filteredQuestions} />
                  <DifficultyChart questions={filteredQuestions} />
                </>
              ) : null
            ) : (
              <div className="border-secondary bg-secondary/30 mb-6 rounded-lg border p-4">
                <Spinner /> Loading data...
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-text/50 text-center">No data available.</div>
      )}
    </div>
  );
};

export default Survey;
