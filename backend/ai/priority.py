def predict_priority(text: str) -> str:
    text = text.lower()

    high_keywords = [
        "no water", "no electricity", "fire", "emergency",
        "danger", "accident", "leak", "short circuit",
        "gas", "stuck", "theft", "unsafe", "not working at all",
        "since days", "since weeks", "urgent"
    ]

    medium_keywords = [
        "slow", "sometimes", "issue", "problem",
        "not proper", "dirty", "delay", "frequent",
        "poor", "inconvenience"
    ]

    # Rule-based high priority
    for word in high_keywords:
        if word in text:
            return "High"

    # Rule-based medium priority
    for word in medium_keywords:
        if word in text:
            return "Medium"

    # Heuristic fallback
    if len(text.split()) > 12:
        return "Medium"

    return "Low"
