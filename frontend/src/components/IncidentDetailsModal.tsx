import type { Incident } from "../types/incident";

interface Props {
  incident: Incident;
  onClose: () => void;
}

export default function IncidentDetailsModal({
  incident,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Incident Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">

          <p>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {incident.category}
          </p>

          <p>
            <span className="font-semibold">
              Severity:
            </span>{" "}
            {incident.severity}
          </p>

          <p>
            <span className="font-semibold">
              Department:
            </span>{" "}
            {incident.department}
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>{" "}
            {incident.status}
          </p>

          <p>
            <span className="font-semibold">
              Location:
            </span>{" "}
            {incident.location}
          </p>

          <p>
            <span className="font-semibold">
              Description:
            </span>
          </p>

          <div className="rounded-xl bg-black p-4">
            {incident.description}
          </div>

          <p>
            <span className="font-semibold">
              AI Summary:
            </span>
          </p>

          <div className="rounded-xl bg-black p-4">
            {incident.summary}
          </div>

        </div>

      </div>
    </div>
  );
}