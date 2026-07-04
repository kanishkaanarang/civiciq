import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { Incident } from "../types/incident";

interface Props {
  incidents: Incident[];
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
];

export default function SeverityPieChart({
  incidents,
}: Props) {
  const severityMap = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  incidents.forEach((incident) => {
    if (
      incident.severity in severityMap
    ) {
      severityMap[
        incident.severity as keyof typeof severityMap
      ]++;
    }
  });

  const data = [
    {
      name: "Critical",
      value: severityMap.Critical,
    },
    {
      name: "High",
      value: severityMap.High,
    },
    {
      name: "Medium",
      value: severityMap.Medium,
    },
    {
      name: "Low",
      value: severityMap.Low,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-blue-600 transition-all duration-300">

      <h3 className="mb-6 text-2xl font-bold">
        🚨 Severity Distribution
      </h3>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={4}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}