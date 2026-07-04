import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

import type { AnalysisResult } from "../types/analysis";
import type { Incident } from "../types/incident";

/* ---------------- SAVE INCIDENT ---------------- */

export async function saveIncident(
  description: string,
  result: AnalysisResult
) {
  const document = await addDoc(collection(db, "incidents"), {
    description,

    category: result.category,
    severity: result.severity,
    department: result.department,

    confidence: result.confidence,

    summary: result.summary,
    reasoning: result.reasoning,

    recommended_action: result.recommended_action,

    location: result.location,

    priority_score: result.priority_score,

    estimated_people_affected:
      result.estimated_people_affected,

    estimated_resolution_time:
      result.estimated_resolution_time,

    operational_impact:
      result.operational_impact,

    required_departments:
      result.required_departments,

    resource_recommendation:
      result.resource_recommendation,

    operational_forecast:
      result.operational_forecast,

    status: "Pending",

    assignedDepartment: null,

    assignedAt: null,

    createdAt: serverTimestamp(),
  });

  return document.id;
}

/* ---------------- ASSIGN ---------------- */

export async function assignIncident(
  incidentId: string,
  department: string
) {
  await updateDoc(
    doc(db, "incidents", incidentId),
    {
      status: "Assigned",

      assignedDepartment: department,

      assignedAt: serverTimestamp(),
    }
  );
}
/* ---------------- RESOLVE ---------------- */

export async function resolveIncident(
  incidentId: string
) {
  await updateDoc(
    doc(db, "incidents", incidentId),
    {
      status: "Resolved",
    }
  );
}

/* ---------------- LIVE ---------------- */

export function subscribeToIncidents(
  callback: (incidents: Incident[]) => void
) {
  return onSnapshot(
    collection(db, "incidents"),
    (snapshot) => {
      const incidents: Incident[] =
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<
            Incident,
            "id"
          >),
        }));

      callback(incidents);
    }
  );
}