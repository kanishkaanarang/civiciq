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
  CheckCircle,
} from "lucide-react";

import { downloadReport } from "../services/pdf";
import {
  assignIncident,
  resolveIncident,
} from "../services/firestore";

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

  const [resolved, setResolved] =
  useState(false);

  const [resolving, setResolving] =
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

  if (assigned || assigning) return; 

  async function handleAssign() {
    if (!incidentId) return;

    try {
      setAssigning(true);

      await assignIncident(
        incidentId,
        result.department
      );

      setAssigned(true);

      setAssigned(true);

    } catch (err) {

      console.error(err);

      alert("Assignment failed.");

    } finally {

      setAssigning(false);

    }
  }

  async function handleResolve() {
    if (!incidentId) return;

    try {
      setResolving(true);

      await resolveIncident(incidentId);

      setResolved(true);

      alert("Incident marked as resolved.");

    } catch (err) {

      console.error(err);

      alert("Failed to resolve incident.");

    } finally {

      setResolving(false);

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
            onClick={() => downloadReport(result)}
            className="rounded-xl bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
          >
            Download Report
          </button>

          <button
            onClick={handleAssign}
            disabled={assigned || assigning || resolved}
            className={`rounded-xl px-6 py-3 transition flex items-center gap-2 ${
              assigned
                ? "bg-green-600"
                : "border border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {assigned ? (
              <>
                <CheckCircle size={18} />
                Assigned
              </>
            ) : assigning ? (
              "Assigning..."
            ) : (
              "Send to Department"
            )}
          </button>

          <button
            onClick={handleResolve}
            disabled={!assigned || resolved || resolving}
            className={`rounded-xl px-6 py-3 transition flex items-center gap-2 ${
              resolved
                ? "bg-blue-600"
                : "border border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {resolved ? (
              <>
                <CheckCircle size={18} />
                Resolved
              </>
            ) : resolving ? (
              "Resolving..."
            ) : (
              "Mark Resolved"
            )}
          </button>

        </div>

      </div>

    </section>

  );
}