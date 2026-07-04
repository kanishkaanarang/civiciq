import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">

              AI DECISION INTELLIGENCE PLATFORM

            </p>

            <h1 className="text-6xl font-black leading-tight">

              Smarter Cities

              <br />

              Through

              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                {" "}
                AI-Powered Decisions

              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-400">

              CivicIQ transforms citizen reports into actionable intelligence
              using multimodal AI. Analyze incidents, prioritize emergencies,
              forecast operational impact, allocate resources and empower city
              authorities to make faster, smarter decisions in real time.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <button
                onClick={() =>
                  document
                    .getElementById("report-form")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              >

                Report Incident

                <ArrowRight size={18} />

              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("dashboard")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="rounded-xl border border-zinc-700 px-8 py-4 transition-all duration-300 hover:border-blue-500 hover:bg-zinc-900"
              >

                View Dashboard

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            <StatCard
              icon={<Activity size={28} />}
              title="Real-Time Monitoring"
              value="24×7"
              color="text-red-400"
            />

            <StatCard
              icon={<ShieldCheck size={28} />}
              title="AI Decision Confidence"
              value="96%"
              color="text-green-400"
            />

            <StatCard
              icon={<Building2 size={28} />}
              title="Departments Coordinated"
              value="10+"
              color="text-blue-400"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

function StatCard({
  icon,
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">

      <div className={`mb-5 ${color}`}>
        {icon}
      </div>

      <p className="text-sm uppercase tracking-wider text-zinc-500">
        {title}
      </p>

      <h3 className={`mt-2 text-4xl font-black ${color}`}>
        {value}
      </h3>

    </div>
  );
}