from fastapi import FastAPI, Body, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.services.gemini_service import test_gemini
from app.services.gemini_service import analyze_text
from app.services.vision_service import analyze_image
from app.services.geocode_service import geocode_location

app = FastAPI(
    title="CivicIQ API",
    description="AI-powered Decision Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://civiciq-gamma.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "running",
        "project": "CivicIQ",
        "version": "1.0.0",
    }


@app.get("/test-ai")
def test_ai():
    return {
        "response": test_gemini()
    }


@app.post("/analyze-text")
def analyze(description: str = Body(embed=True)):
    return analyze_text(description)


@app.post("/analyze-multimodal")
async def analyze_multimodal(
    description: str = Form(...),
    image: UploadFile = File(...)
):
    image_bytes = await image.read()

    return analyze_image(
        description=description,
        image_bytes=image_bytes,
        mime_type=image.content_type,
    )

@app.post("/geocode")
def geocode(location: str = Body(embed=True)):
    result = geocode_location(location)

    if result is None:
        return {
            "success": False,
            "message": "Location not found."
        }

    return {
        "success": True,
        **result
    }