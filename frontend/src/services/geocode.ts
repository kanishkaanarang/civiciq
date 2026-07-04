import type { GeoLocation } from "../types/analysis";

export async function geocodeLocation(
  location: string
): Promise<GeoLocation> {

  const response = await fetch(
    "http://127.0.0.1:8000/geocode",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        location,
      }),
    }
  );

  return response.json();
}