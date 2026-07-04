def calculate_priority(severity: str) -> int:
    scores = {
        "Low": 25,
        "Medium": 50,
        "High": 75,
        "Critical": 95,
    }

    return scores.get(severity, 50)