import type { Incident } from "../types/incident";

interface Props {
  incidents: Incident[];
}

export default function RecentIncidents({
  incidents,
}: Props) {
  const sorted = [...incidents].sort((a, b) => {
    const ta =
      a.createdAt?.seconds ?? 0;

    const tb =
      b.createdAt?.seconds ?? 0;

    return tb - ta;
  });

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h3 className="text-2xl font-bold mb-6">
        Recent Incidents
      </h3>

      <div className="space-y-4">

        {sorted.slice(0, 6).map((incident) => (

          <div
            key={incident.id}
            className="rounded-xl bg-black border border-zinc-800 p-4"
          >

            <div className="flex justify-between">

              <div>

                <h4 className="font-semibold">
                  {incident.category}
                </h4>

                <p className="text-zinc-400 text-sm mt-1">
                  {incident.location}
                </p>

              </div>

              <div
                className={`font-semibold ${
                  incident.severity === "Critical"
                    ? "text-red-400"
                    : incident.severity === "High"
                    ? "text-orange-400"
                    : incident.severity === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {incident.severity}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}