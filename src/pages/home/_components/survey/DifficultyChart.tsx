import type { Question } from "@/lib/types";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DifficultyChartProps = {
  questions: Question[];
};

type DifficultyData = {
  name: string;
  count: number;
};

const DifficultyChart = ({ questions }: DifficultyChartProps) => {
  const data: DifficultyData[] = ["easy", "medium", "hard"].map((level) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    count: questions.filter((q) => q.difficulty === level).length,
  }));

  return (
    <div className="border-secondary bg-secondary/30 mb-6 rounded-lg border p-4">
      <div className="mb-4 flex items-center gap-2">
        {" "}
        <span className="bg-primary flex h-6 w-6 items-center justify-center rounded-full p-3 text-base text-white">
          2
        </span>
        <h2 className="text-text flex items-center gap-2 text-xl leading-6 font-semibold">
          Distribution of questions by difficulty
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tick={{ fontSize: 13 }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="border-secondary rounded border bg-white p-3">
                    <p className="text-text font-semibold">
                      {payload[0].payload.name}
                    </p>
                    <p className="text-orange-500">
                      Questions: {payload[0].payload.count}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#f6119b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;
