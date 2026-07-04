import type { GeoLocation } from "../types/analysis";

export async function geocodeLocation(
  location: string
): Promise<GeoLocation> {

  const response = await fetch(
    "https://civiciq-f77f.onrender.com/geocode",
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