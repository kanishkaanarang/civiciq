import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-8 pt-20">
      <div className="max-w-4xl">
        <p className="mb-4 font-semibold uppercase tracking-[0.35em] text-blue-400">
          AI OPERATIONS CENTER
        </p>

        <h1 className="text-6xl font-black leading-tight text-white">
          Smarter Cities
          <br />
          Start With
          <span className="text-blue-500"> Better Decisions.</span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-400">
          CivicIQ transforms citizen reports into actionable intelligence using
          AI, helping authorities prioritize incidents, predict impact and make
          better decisions in real time.
        </p>

        <div className="mt-12 flex gap-5">
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700">
            Report Incident

            <ArrowRight size={18} />
          </button>

          <button className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:bg-zinc-900">
            View Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}