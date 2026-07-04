import type { Incident } from "../types/incident";
import {
  CheckCircle,
  Clock3,
  AlertCircle,
} from "lucide-react";

interface Props {
  incidents: Incident[];
  onSelect: (incident: Incident) => void;
}

export default function RecentIncidents({
  incidents,
  onSelect,
}: Props) {
  const sorted = [...incidents].sort((a, b) => {
    const ta = a.createdAt?.seconds ?? 0;
    const tb = b.createdAt?.seconds ?? 0;

    return tb - ta;
  });

  function formatTime(timestamp: any) {
    if (!timestamp?.seconds) return "Just now";

    const date = new Date(timestamp.seconds * 1000);

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function StatusBadge({
    status,
  }: {
    status: Incident["status"];
  }) {
    if (status === "Assigned") {
      return (
        <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
          <CheckCircle size={14} />
          Assigned
        </div>
      );
    }

    if (status === "Resolved") {
      return (
        <div className="flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
          <CheckCircle size={14} />
          Resolved
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
        <AlertCircle size={14} />
        Pending
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 min-h-125">
      <h3 className="mb-6 text-2xl font-bold">
        Recent Incidents
      </h3>

      <div className="space-y-4">
        {sorted.length === 0 ? (
          <p className="text-zinc-500">
            No incidents reported yet.
          </p>
        ) : (
          sorted.slice(0, 6).map((incident) => (
            <div
              key={incident.id}
              onClick={() => onSelect(incident)}
              className={`rounded-xl border p-4 transition ${
                incident.status === "Resolved"
                  ? "border-green-600"
                  : incident.status === "Assigned"
                  ? "border-blue-600"
                  : "border-zinc-800 hover:border-blue-600"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">
                    {incident.category}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-400">
                    {incident.location}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                    <Clock3 size={14} />
                    {formatTime(incident.createdAt)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`font-semibold ${
                      incident.severity ===
                      "Critical"
                        ? "text-red-400"
                        : incident.severity ===
                          "High"
                        ? "text-orange-400"
                        : incident.severity ===
                          "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {incident.severity}
                  </span>

                  <StatusBadge
                    status={incident.status}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}