import type { QuestionsResponse } from "@/lib/types";
import { cn, decodeHtml } from "@/lib/utils";

type QuestionsListProps = {
  questions: QuestionsResponse["results"];
  maxDisplay?: number;
};

const QuestionsList = ({ questions, maxDisplay = 5 }: QuestionsListProps) => {
  return (
    <div className="space-y-3">
      {questions.slice(0, maxDisplay).map((question, index) => (
        <div
          key={index}
          className="border-secondary bg-secondary/30 rounded-lg border p-4"
        >
          <div className="flex items-start gap-2">
            <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="text-text mb-2 font-semibold">
                {decodeHtml(question.question)}{" "}
                <span className="text-green-700">
                  {decodeHtml(question.correct_answer)}{" "}
                </span>
              </p>
              <div className="flex gap-1 text-xs">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
                  {decodeHtml(question.category)}{" "}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1",
                    question.difficulty === "easy" &&
                      "bg-green-100 text-green-700",
                    question.difficulty === "medium" &&
                      "bg-orange-100 text-orange-700",
                    question.difficulty === "hard" && "bg-red-100 text-red-700",
                  )}
                >
                  {question.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
