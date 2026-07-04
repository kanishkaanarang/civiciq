import { useState } from "react";
import AIResultCard from "./AIResultCard";
import ImageUploader from "./ImageUploader";
import type { AnalysisResult } from "../types/analysis";
import { saveIncident } from "../services/firestore";

export default function ReportForm() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function analyzeIssue() {
    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    setLoading(true);

    try {
      let response: Response;

      if (image) {
        const formData = new FormData();

        formData.append("description", description);
        formData.append("image", image);

        response = await fetch(
          "http://127.0.0.1:8000/analyze-multimodal",
          {
            method: "POST",
            body: formData,
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/analyze-text",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description,
            }),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Backend request failed.");
      }

      const data = await response.json();

      setResult(data);
      await saveIncident(description, data);
      
    } catch (err) {
      console.error(err);
      alert("Failed to analyze incident.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto px-10 py-24">
        <h2 className="text-5xl font-bold">
          Report a Civic Issue
        </h2>

        <p className="mt-4 text-zinc-400">
          Describe the issue and optionally upload an image for a more accurate
          AI analysis.
        </p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          className="mt-8 h-56 w-full rounded-3xl border border-zinc-700 bg-zinc-900 p-6 text-lg outline-none focus:border-blue-500"
        />

        <ImageUploader
          image={image}
          setImage={setImage}
        />

        <button
          onClick={analyzeIssue}
          disabled={loading}
          className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
      </section>

      {result && <AIResultCard result={result} />}
    </>
  );
}