import requests


def search(query: str):
    url = "https://nominatim.openstreetmap.org/search"

    response = requests.get(
        url,
        params={
            "q": query,
            "format": "json",
            "limit": 1,
        },
        headers={
            "User-Agent": "CivicIQ-Hackathon"
        },
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    if not data:
        return None

    return {
        "latitude": float(data[0]["lat"]),
        "longitude": float(data[0]["lon"]),
        "display_name": data[0]["display_name"],
    }


def geocode_location(location: str):

    # Try original
    result = search(location)

    if result:
        return result

    # Remove "Gate"
    simplified = (
        location.replace("Gate 1", "")
        .replace("Gate 2", "")
        .replace("Gate 3", "")
        .replace("Gate 4", "")
    )

    result = search(simplified)

    if result:
        return result

    # Remove "Station"
    simplified = simplified.replace("Station", "")

    result = search(simplified)

    if result:
        return result

    # Last fallback
    words = simplified.split()

    if len(words) >= 2:
        result = search(" ".join(words[:2]))

    return result