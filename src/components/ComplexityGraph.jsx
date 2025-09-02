import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { name: "Bubble", Time: 100 },
  { name: "Selection", Time: 90 },
  { name: "Insertion", Time: 80 },
  { name: "Merge", Time: 40 },
  { name: "Quick", Time: 30 },
];

export default function ComplexityGraph() {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-center mb-4">
        Time Complexity Comparison
      </h2>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Time" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
