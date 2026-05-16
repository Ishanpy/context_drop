from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

_analyzer = AnalyzerEngine()
_anonymizer = AnonymizerEngine()


def scrub(text: str) -> str:
    """Remove PII (emails, phone numbers, names) from text before storing."""
    if not text:
        return text
    try:
        results = _analyzer.analyze(text=text, language="en")
        if not results:
            return text
        anonymized = _anonymizer.anonymize(text=text, analyzer_results=results)
        return anonymized.text
    except Exception:
        return text