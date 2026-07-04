import type { Incident } from "../types/incident";

interface Props {
  incidents: Incident[];
}

export default function DepartmentStatus({
  incidents,
}: Props) {

  const departments = Array.from(
    new Set(
      incidents.map((i) => i.department)
    )
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mt-8">

      <h3 className="text-2xl font-bold mb-6">
        Department Status
      </h3>

      <div className="space-y-4">

        {departments.map((dept) => {

          const deptIncidents =
            incidents.filter(
              (i) =>
                i.department === dept
            );

          const pending =
            deptIncidents.filter(
              (i) =>
                i.status === "Pending"
            ).length;

          const assigned =
            deptIncidents.filter(
              (i) =>
                i.status === "Assigned"
            ).length;

          const resolved =
            deptIncidents.filter(
              (i) =>
                i.status === "Resolved"
            ).length;

          return (

            <div
              key={dept}
              className="rounded-xl bg-black border border-zinc-800 p-4"
            >

              <div className="flex justify-between items-center">

                <h4 className="font-semibold">
                  {dept}
                </h4>

                <span className="text-blue-400 font-bold">
                  {deptIncidents.length}
                </span>

              </div>

              <div className="flex gap-6 mt-4 text-sm">

                <span className="text-yellow-400">
                  Pending: {pending}
                </span>

                <span className="text-green-400">
                  Assigned: {assigned}
                </span>

                <span className="text-blue-400">
                  Resolved: {resolved}
                </span>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}