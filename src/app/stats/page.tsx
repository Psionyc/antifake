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

const networks = [
  { name: "Channels TV", score: 78, image: "https://logo.clearbit.com/channelstv.com", link: "https://channelstv.com" },
  { name: "AIT", score: 65, image: "https://logo.clearbit.com/ait.live", link: "https://ait.live" },
  { name: "Punch", score: 72, image: "https://logo.clearbit.com/punchng.com", link: "https://punchng.com" },
  { name: "Vanguard", score: 70, image: "https://logo.clearbit.com/vanguardngr.com", link: "https://vanguardngr.com" },
  { name: "The Guardian Nigeria", score: 80, image: "https://logo.clearbit.com/guardian.ng", link: "https://guardian.ng" },
  { name: "Sahara Reporters", score: 55, image: "https://logo.clearbit.com/saharareporters.com", link: "https://saharareporters.com" },
  { name: "This Day", score: 68, image: "https://logo.clearbit.com/thisdaylive.com", link: "https://thisdaylive.com" },
  { name: "Daily Trust", score: 75, image: "https://logo.clearbit.com/dailytrust.com", link: "https://dailytrust.com" },
  { name: "The Nation", score: 73, image: "https://logo.clearbit.com/thenationonlineng.net", link: "https://thenationonlineng.net" },
  { name: "NTA News", score: 60, image: "https://logo.clearbit.com/nta.ng", link: "https://nta.ng" },
];

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
