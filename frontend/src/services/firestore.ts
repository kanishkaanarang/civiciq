import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

import type { AnalysisResult } from "../types/analysis";
import type { Incident } from "../types/incident";

/* ---------------- SAVE INCIDENT ---------------- */

export async function saveIncident(
  description: string,
  result: AnalysisResult
) {
  await addDoc(collection(db, "incidents"), {
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

    createdAt: serverTimestamp(),
  });
}

/* ---------------- GET INCIDENTS (One Time) ---------------- */

export async function getIncidents(): Promise<Incident[]> {
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      collection(db, "incidents"),
      (snapshot) => {
        const incidents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Incident, "id">),
        }));

        unsubscribe();

        resolve(incidents);
      }
    );
  });
}

/* ---------------- REAL-TIME LISTENER ---------------- */

export function subscribeToIncidents(
  callback: (incidents: Incident[]) => void
) {
  return onSnapshot(
    collection(db, "incidents"),
    (snapshot) => {
      const incidents: Incident[] = snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Incident, "id">),
        })
      );

      callback(incidents);
    }
  );
}