import { useEffect, useState } from "react";
import { getIncidents } from "../services/firestore";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIncidents() {
      try {
        const data = await getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadIncidents();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto mt-24 px-10">
        <h2 className="text-4xl font-bold">
          City Operations Dashboard
        </h2>

        <p className="mt-8 text-zinc-400">
          Loading incidents...
        </p>
      </section>
    );
  }

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

  return (
    <section className="max-w-6xl mx-auto mt-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        City Operations Dashboard
      </h2>

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

    </section>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h3 className="mt-4 text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}