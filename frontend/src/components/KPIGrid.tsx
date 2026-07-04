import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  BrainCircuit,
} from "lucide-react";

const stats = [
  {
    title: "AI Accuracy",
    value: "96%",
    subtitle: "Gemini Decision Engine",
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    icon: <BrainCircuit size={30} />,
  },
  {
    title: "Departments",
    value: "10+",
    subtitle: "Auto Assignment Ready",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    icon: <Building2 size={30} />,
  },
  {
    title: "Priority Detection",
    value: "Real-Time",
    subtitle: "Critical Incident Routing",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    icon: <AlertTriangle size={30} />,
  },
  {
    title: "Decision Support",
    value: "24×7",
    subtitle: "Continuous AI Analysis",
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    icon: <ShieldCheck size={30} />,
  },
];

export default function KPIGrid() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className={`group rounded-3xl border ${stat.border} bg-zinc-900/70 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10`}
          >

            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>

            <p className="text-sm uppercase tracking-wider text-zinc-500">
              {stat.title}
            </p>

            <h2
              className={`mt-3 text-4xl font-black ${stat.color}`}
            >
              {stat.value}
            </h2>

            <p className="mt-4 text-sm text-zinc-400">
              {stat.subtitle}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}