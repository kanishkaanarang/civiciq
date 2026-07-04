import {
  BrainCircuit,
  GitBranch,
  Mail,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-zinc-800 bg-black">

      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* LEFT */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">

                <BrainCircuit size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-black">
                  CivicIQ
                </h2>

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  AI Decision Intelligence
                </p>

              </div>

            </div>

            <p className="leading-7 text-zinc-400">

              CivicIQ empowers smarter cities through AI-driven
              decision intelligence, helping authorities analyze
              incidents, predict operational impact, optimize
              resources and improve public safety in real time.

            </p>

          </div>

          {/* CENTER */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              Tech Stack
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p>⚛ React + TypeScript</p>

              <p>⚡ FastAPI</p>

              <p>🔥 Firebase Firestore</p>

              <p>🤖 Google Gemini AI</p>

              <p>🗺 Leaflet Maps</p>

              <p>📊 Recharts</p>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <h3 className="mb-5 text-lg font-bold">
              Project
            </h3>

            <div className="space-y-4">

              <a
                href="https://github.com/kanishkaanarang/civiciq"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
              >

                <GitBranch size={18} />

                GitHub Repository

              </a>

              <a
                href="mailto:kanishkaanarang@email.com"
                className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
              >

                <Mail size={18} />

                Contact

              </a>

            </div>

          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row">

          <p>

            Built for <span className="font-semibold text-white">Smart India Hackathon 2026</span>

          </p>

          <p className="flex items-center gap-2">

            Made with

            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />

            using Google Gemini AI

          </p>

        </div>

      </div>

    </footer>
  );
}