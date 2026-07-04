const API_URL = "http://127.0.0.1:8000";

export async function analyzeIssue(description: string) {
  const response = await fetch(`${API_URL}/analyze-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze issue.");
  }

  return await response.json();
}