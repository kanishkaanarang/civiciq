import {
  BrainCircuit,
  Bell,
  Activity,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-black/70 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* LOGO */}

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">

            <BrainCircuit size={26} />

          </div>

          <div>

            <h1 className="text-2xl font-black">

              CivicIQ

            </h1>

            <p className="text-xs tracking-widest text-zinc-500 uppercase">

              Decision Intelligence

            </p>

          </div>

        </div>

        {/* CENTER */}

        <nav className="hidden gap-10 text-sm text-zinc-400 lg:flex">

          <button
            onClick={() =>
              document
                .getElementById("report-form")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="transition hover:text-white"
          >
            Report
          </button>

          <button
            onClick={() =>
              document
                .getElementById("dashboard")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="transition hover:text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="transition hover:text-white"
          >
            Home
          </button>

        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <div className="hidden items-center gap-2 rounded-full border border-green-600/30 bg-green-500/10 px-4 py-2 lg:flex">

            <Activity
              size={16}
              className="text-green-400"
            />

            <span className="text-sm text-green-400">

              System Online

            </span>

          </div>

          <button className="rounded-xl border border-zinc-700 p-3 transition hover:border-blue-500 hover:bg-zinc-900">

            <Bell size={20} />

          </button>

        </div>

      </div>

    </header>
  );
}