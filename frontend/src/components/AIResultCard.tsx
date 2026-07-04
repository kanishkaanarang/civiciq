import { useEffect, useState } from "react";

import type {
  AnalysisResult,
  GeoLocation,
} from "../types/analysis";

import {
  ShieldAlert,
  Building2,
  Brain,
  TrendingUp,
} from "lucide-react";

import { downloadReport } from "../services/pdf";
import { assignIncident } from "../services/firestore";
import { geocodeLocation } from "../services/geocode";

import DecisionBrief from "./DecisionBrief";
import IncidentMap from "./IncidentMap";
import InfoCard from "./InfoCard";
import Section from "./Section";
import ResourceRecommendation from "./ResourceRecommendation";
import OperationalForecast from "./OperationalForecast";

interface Props {
  result: AnalysisResult;
  incidentId: string;
}

export default function AIResultCard({
  result,
  incidentId,
}: Props) {

  const [geo, setGeo] =
    useState<GeoLocation | null>(null);

  const [assigned, setAssigned] =
    useState(false);

  const [assigning, setAssigning] =
    useState(false);
  useEffect(() => {

    async function loadLocation() {

      try {

        const response =
          await geocodeLocation(
            result.location
          );

        if (response.success) {
          setGeo(response);
        }

      } catch (err) {

        console.error(err);

      }

    }

    if (result.location) {
      loadLocation();
    }

  }, [result.location]);

  async function handleAssign() {
    if (!incidentId) return;

    try {
      setAssigning(true);

      await assignIncident(
        incidentId,
        result.department
      );

      setAssigned(true);

      alert(
        `Incident assigned to ${result.department}`
      );

    } catch (err) {

      console.error(err);

      alert("Assignment failed.");

    } finally {

      setAssigning(false);

    }
  }

  return (

    <section
      id="analysis-result"
      className="max-w-6xl mx-auto px-10 mt-20"
    >
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold">

              AI Analysis

            </h2>

            <p className="mt-2 text-zinc-400">

              Generated using Gemini AI

            </p>

          </div>

          <div className="rounded-full bg-green-500/20 px-5 py-2 font-semibold text-green-400">

            Completed

          </div>

        </div>

        {/* KPI GRID */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <InfoCard
            icon={<ShieldAlert size={22} />}
            title="Category"
            value={result.category}
          />

          <InfoCard
            icon={<TrendingUp size={22} />}
            title="Severity"
            value={result.severity}
          />

          <InfoCard
            icon={<Building2 size={22} />}
            title="Responsible Department"
            value={result.department}
          />

          <InfoCard
            icon={<Brain size={22} />}
            title="Confidence"
            value={`${Math.round(
              result.confidence * 100
            )}%`}
          />

        </div>

        <DecisionBrief
          priority_score={result.priority_score}
          estimated_people_affected={
            result.estimated_people_affected
          }
          estimated_resolution_time={
            result.estimated_resolution_time
          }
          required_departments={
            result.required_departments
          }
        />

        <ResourceRecommendation
          result={result}
        />

        <OperationalForecast
          result={result}
        />

        <Section
          title="Summary"
          text={result.summary}
        />

        <Section
          title="Operational Impact"
          text={result.operational_impact}
        />

        <Section
          title="Recommended Action"
          text={result.recommended_action}
        />

        <Section
          title="AI Reasoning"
          text={result.reasoning}
        />

        {geo && (

          <IncidentMap
            latitude={geo.latitude}
            longitude={geo.longitude}
            location={result.location}
            category={result.category}
            severity={result.severity}
            priority={result.priority_score}
          />

        )}

        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={() =>
              downloadReport(result)
            }
            className="rounded-xl bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
          >

            Download Report
          </button>
          <button
            onClick={handleAssign}
            disabled={assigned || assigning}
            className={`rounded-xl px-6 py-3 transition ${
              assigned
                ? "bg-green-600 cursor-default"
                : "border border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {assigning
              ? "Assigning..."
              : assigned
              ? `✓ Assigned to ${result.department}`
              : "Send to Department"}
          </button>
        </div>

      </div>

    </section>

  );
}