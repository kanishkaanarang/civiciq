from google import genai
import json
from app.config.settings import settings
from app.prompts.incident_prompt import SYSTEM_PROMPT

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def test_gemini():
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Reply with exactly: CivicIQ AI is connected."
    )

    return response.text.strip()


def analyze_text(description: str):
    prompt = f"""
{SYSTEM_PROMPT}

Citizen Report:
{description}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    cleaned = (
    response.text
    .replace("```json", "")
    .replace("```", "")
    .strip()
    )

    return json.loads(cleaned)