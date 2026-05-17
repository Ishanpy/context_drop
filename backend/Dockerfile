FROM python:3.11-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt --prefer-binary

COPY backend/ .

CMD ["/bin/sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]