import type { Question } from "@/lib/types";
import { decodeHtml } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CategoryChartProps = {
  questions: Question[];
};

type CategoryData = {
  name: string;
  count: number;
};

const COLORS = ["#F06292", "#FF2079", "#F60088", "#9C27B0", "#311B92"];

const CategoryChart = ({ questions }: CategoryChartProps) => {
  const data: CategoryData[] = questions.reduce<CategoryData[]>((acc, q) => {
    const existing = acc.find((item) => item.name === q.category);
    if (existing) existing.count += 1;
    else acc.push({ name: q.category, count: 1 });
    return acc;
  }, []);

  const decodedData = data
    .map((d) => ({ ...d, name: decodeHtml(d.name) }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="border-secondary bg-secondary/30 mb-6 border p-4">
      <header className="mb-4">
        <div className="flex items-center gap-2">
          {" "}
          <span className="bg-primary flex h-6 w-6 items-center justify-center rounded-full p-3 text-base text-white">
            1
          </span>
          <h2 className="text-text flex items-center gap-2 text-xl leading-6 font-semibold">
            Distribution of questions by category
          </h2>
        </div>
      </header>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={decodedData}
          layout="vertical"
          margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
          barCategoryGap={20}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            content={({ active, payload }) => {
              if (active && payload?.length) {
                const { name, count } = payload[0].payload;
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
                    <p className="text-text font-medium">{name}</p>
                    <p className="text-sm text-orange-500">
                      Questions: {count}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={22}>
            {decodedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
