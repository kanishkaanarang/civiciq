import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function QuickActions() {
  function scrollToReport() {
    document.getElementById("report-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToDashboard() {
    document.getElementById("dashboard")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="max-w-6xl mx-auto px-10 mt-16">
      <h2 className="text-3xl font-bold mb-8">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-6">
        <button
          onClick={scrollToReport}
          className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-5 hover:bg-blue-700 transition"
        >
          Report Incident

          <ArrowRight size={20} />
        </button>

        <button
          onClick={scrollToDashboard}
          className="flex items-center gap-3 rounded-2xl border border-zinc-700 px-8 py-5 hover:bg-zinc-900 transition"
        >
          Dashboard

          <LayoutDashboard size={20} />
        </button>
      </div>
    </section>
  );
}