"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from "recharts";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";

interface RecordData {
  source: string;
  avgScore: number;
  count: number;
}

const COLORS = ["#10B981", "#EF4444"];
const barData = [
  { name: "Mon", checked: 10 },
  { name: "Tue", checked: 15 },
  { name: "Wed", checked: 7 },
  { name: "Thu", checked: 20 },
  { name: "Fri", checked: 5 },
];

export default function StatsPage() {
  const [records, setRecords] = useState<RecordData[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then(setRecords)
      .catch((err) => console.error('stats fetch error', err));
  }, []);

  const networks = records.map((r) => ({
    name: r.source,
    score: Math.round(r.avgScore),
    image: `https://logo.clearbit.com/${r.source}`,
    link: `https://${r.source}`,
  }));
  const pieData = [
    {
      name: 'Genuine',
      value: records.reduce((a, r) => a + (r.avgScore >= 50 ? r.count : 0), 0),
    },
    {
      name: 'Not Genuine',
      value: records.reduce((a, r) => a + (r.avgScore < 50 ? r.count : 0), 0),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-950 p-4 text-white space-y-8">
      <div className="w-full">
        <Link href="/" className="flex items-center gap-1 text-white hover:underline">
          <FiArrowLeft /> Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold">Statistics</h1>
      <h2 className="text-lg font-semibold">News Channels &amp; Credibility Scores</h2>
      <div className="grid w-full max-w-xl grid-cols-1 gap-4">
        {networks.map((nw, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg bg-gray-800 p-4"
          >
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nw.image} alt={nw.name} className="h-12 w-12 rounded-full" />
              <a
                href={nw.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {nw.name}
              </a>
            </div>
            <div
              className="rounded px-3 py-1 font-semibold text-black"
              style={{ backgroundColor: `hsl(${nw.score * 1.2},70%,50%)` }}
            >
              {nw.score}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-xl">
        <h2 className="mb-4 text-lg font-semibold">Genuine vs Not-Genuine News</h2>
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
