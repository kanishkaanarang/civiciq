import { useEffect, useMemo, useState } from "react";

import type { Incident } from "../types/incident";

import {
  subscribeToIncidents,
} from "../services/firestore";

import RecentIncidents from "./RecentIncidents";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToIncidents((data) => {
      setIncidents(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const total = incidents.length;

  const critical = incidents.filter(
    (i) => i.severity === "Critical"
  ).length;

  const high = incidents.filter(
    (i) => i.severity === "High"
  ).length;

  const avgConfidence =
    incidents.length === 0
      ? 0
      : Math.round(
          incidents.reduce(
            (sum, i) => sum + (i.confidence ?? 0),
            0
          ) /
            incidents.length *
            100
        );

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};

    incidents.forEach((incident) => {
      stats[incident.category] =
        (stats[incident.category] ?? 0) + 1;
    });

    return Object.entries(stats).sort(
      (a, b) => b[1] - a[1]
    );
  }, [incidents]);

  const departmentStats = useMemo(() => {
    const stats: Record<string, number> = {};

    incidents.forEach((incident) => {
      stats[incident.department] =
        (stats[incident.department] ?? 0) + 1;
    });

    return Object.entries(stats).sort(
      (a, b) => b[1] - a[1]
    );
  }, [incidents]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-10 py-24">

        <h2 className="text-5xl font-bold">
          City Operations Dashboard
        </h2>

        <p className="mt-8 text-zinc-400">
          Loading live incidents...
        </p>

      </section>
    );
  }

  return (
    <section
      id="dashboard"
      className="max-w-7xl mx-auto px-10 py-24"
    >
      <h2 className="text-5xl font-bold mb-12">
        City Operations Dashboard
      </h2>

      {/* KPI CARDS */}

      <div className="grid md:grid-cols-4 gap-6">

        <Card
          title="Total Incidents"
          value={String(total)}
        />

        <Card
          title="Critical"
          value={String(critical)}
        />

        <Card
          title="High Priority"
          value={String(high)}
        />

        <Card
          title="Avg Confidence"
          value={`${avgConfidence}%`}
        />

      </div>

      {/* ANALYTICS */}

      <div className="grid lg:grid-cols-3 gap-8 mt-12">

        <RecentIncidents
          incidents={incidents}
        />

        <AnalyticsCard
          title="Incident Categories"
          data={categoryStats}
        />

        <AnalyticsCard
          title="Department Workload"
          data={departmentStats}
        />

      </div>

    </section>
  );
}

interface CardProps {
  title: string;
  value: string;
}

function Card({
  title,
  value,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h3 className="mt-4 text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  data: [string, number][];
}

function AnalyticsCard({
  title,
  data,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h3 className="text-2xl font-bold mb-6">
        {title}
      </h3>

      <div className="space-y-4">

        {data.length === 0 ? (
          <p className="text-zinc-500">
            No data available.
          </p>
        ) : (
          data.map(([label, count]) => (

            <div
              key={label}
              className="flex justify-between border-b border-zinc-800 pb-2"
            >

              <span>
                {label}
              </span>

              <span className="font-bold text-blue-400">
                {count}
              </span>

            </div>

          ))
        )}

      </div>

    </div>
  );
}