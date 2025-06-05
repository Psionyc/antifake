"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Fake", value: 60 },
  { name: "Not Fake", value: 40 },
];

const barData = [
  { name: "Mon", checked: 10 },
  { name: "Tue", checked: 15 },
  { name: "Wed", checked: 7 },
  { name: "Thu", checked: 20 },
  { name: "Fri", checked: 5 },
];

const COLORS = ["#EF4444", "#10B981"];

export default function StatsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-950 p-4 text-white space-y-8">
      <h1 className="text-3xl font-bold">Statistics</h1>
      <div className="w-full max-w-xl">
        <h2 className="mb-4 text-lg font-semibold">Fake vs Not-Fake News</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full max-w-xl">
        <h2 className="mb-4 text-lg font-semibold">Articles Checked Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="checked" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
