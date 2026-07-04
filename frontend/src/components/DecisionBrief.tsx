import {
  Activity,
  BriefcaseBusiness,
  Clock3,
  Users,
} from "lucide-react";

import InfoCard from "./InfoCard";

interface Props {
  priority_score: number;
  estimated_people_affected: string;
  estimated_resolution_time: string;
  required_departments: string[];
}

export default function DecisionBrief({
  priority_score,
  estimated_people_affected,
  estimated_resolution_time,
  required_departments,
}: Props) {
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-8">
        Decision Brief
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <InfoCard
          icon={<Activity size={22} />}
          title="Priority Score"
          value={`${priority_score}/100`}
        />

        <InfoCard
          icon={<Users size={22} />}
          title="People Affected"
          value={estimated_people_affected}
        />

        <InfoCard
          icon={<Clock3 size={22} />}
          title="Resolution Time"
          value={estimated_resolution_time}
        />

        <InfoCard
          icon={<BriefcaseBusiness size={22} />}
          title="Departments Required"
          value={required_departments.join(", ")}
        />

      </div>

    </div>
  );
}