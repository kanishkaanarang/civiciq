import { useEffect, useMemo, useState } from "react";

import type { Incident } from "../types/incident";

import {
  subscribeToIncidents,
} from "../services/firestore";

import RecentIncidents from "./RecentIncidents";
import IncidentDetailsModal from "./IncidentDetailsModal";
import DepartmentStatus from "./DepartmentStatus";
import SeverityPieChart from "./SeverityPieChart";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [severityFilter, setSeverityFilter] =
    useState("All");

  const [selectedIncident, setSelectedIncident] =
    useState<Incident | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToIncidents((data) => {
      setIncidents(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const total = incidents.length;


  const resolved = incidents.filter(
    (i) => i.status === "Resolved"
  ).length;

  const resolutionRate =
    total === 0
      ? 0
      : Math.round((resolved / total) * 100);
  
  const filteredIncidents = incidents.filter(
    (incident) => {
      const matchesSearch =
        incident.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        incident.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        incident.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" ||
        incident.severity === severityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSeverity
      );
    }
  );

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};

    filteredIncidents.forEach((incident) => {
      stats[incident.category] =
        (stats[incident.category] ?? 0) + 1;
    });

    return Object.entries(stats).sort(
      (a, b) => b[1] - a[1]
    );
  }, [filteredIncidents]);

  
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

      <div className="grid md:grid-cols-5 gap-6">

        <Card
          title="Total Incidents"
          value={String(total)}
        />

        <Card
          title="Pending"
          value={String(
            incidents.filter(
              (i) => i.status === "Pending"
            ).length
          )}
        />

        <Card
          title="Assigned"
          value={String(
            incidents.filter(
              (i) => i.status === "Assigned"
            ).length
          )}
        />

        <Card
          title="Resolved"
          value={String(
            incidents.filter(
              (i) => i.status === "Resolved"
            ).length
          )}
        />

        <Card
          title="Resolution Rate"
          value={`${resolutionRate}%`}
        />

      </div>
      <div className="mt-10 flex flex-wrap gap-4">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search incidents..."
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 w-72"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>Resolved</option>
        </select>

        <select
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3"
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

      </div>

      {/* ANALYTICS */}

      <div className="grid lg:grid-cols-2 gap-8 mt-12">

        <RecentIncidents
          incidents={filteredIncidents}
          onSelect={setSelectedIncident}
        />

        <AnalyticsCard
          title="Incident Categories"
          data={categoryStats}
        />

        <SeverityPieChart
          incidents={filteredIncidents}
        />

        <DepartmentStatus
          incidents={filteredIncidents}
        />

      </div>
      {selectedIncident && (
        <IncidentDetailsModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
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
          data.map(([label, count]) => {
            const max = data[0][1];

            return (
              <div
                key={label}
                className="space-y-2"
              >
                <div className="flex justify-between">

                  <span>{label}</span>

                  <span className="font-bold text-blue-400">
                    {count}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${(count / max) * 100}%`,
                    }}
                  />

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}