import type { QuestionsResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

type CategoryFilterProps = {
  uniqueCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  questions: QuestionsResponse;
};

const CategoryFilter = ({
  uniqueCategories,
  selectedCategory,
  setSelectedCategory,
  questions,
}: CategoryFilterProps) => (
  <div className="border-secondary bg-secondary/30 mb-6 rounded-lg border p-4">
    <div className="mb-4 flex items-center gap-2">
      <Filter className="text-primary" />
      <h2 className="text-text text-xl font-semibold">Filter by Category</h2>
    </div>

    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedCategory("all")}
        className={cn(
          "cursor-pointer rounded-lg px-4 py-2 transition",
          selectedCategory === "all"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200",
        )}
      >
        All Categories ({questions.results.length})
      </button>

      {uniqueCategories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={cn(
            "cursor-pointer rounded-lg px-4 py-2 text-sm transition",
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200",
          )}
        >
          {category.length > 30 ? category.substring(0, 30) + "..." : category}(
          {questions.results.filter((q) => q.category === category).length})
        </button>
      ))}
    </div>
  </div>
);

export default CategoryFilter;
