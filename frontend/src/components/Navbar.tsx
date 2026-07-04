import { Bell, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              CivicIQ
            </h1>

            <p className="text-xs text-zinc-400">
              AI Decision Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="rounded-xl border border-zinc-700 p-3 transition hover:bg-zinc-900">
            <Bell size={18} />
          </button>

          <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700">
            Report Incident
          </button>
        </div>
      </div>
    </nav>
  );
}