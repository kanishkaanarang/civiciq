import json

from google import genai
from google.genai import types

from app.config.settings import settings
from app.prompts.incident_prompt import SYSTEM_PROMPT

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_image(
    description: str,
    image_bytes: bytes,
    mime_type: str,
):
    prompt = f"""
{SYSTEM_PROMPT}

The user has provided BOTH an image and a written report.

Use BOTH.

Citizen Report:

{description}

Return ONLY valid JSON.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type,
            ),
        ],
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)