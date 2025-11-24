from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizResult(BaseModel):
    username: str
    house: str

RESULTS_FILE = "results.json"

@app.post("/submit")
async def submit_result(result: QuizResult):
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, "r") as f:
            results = json.load(f)
    else:
        results = []

    results.append(result.dict())

    with open(RESULTS_FILE, "w") as f:
        json.dump(results, f, indent=4)

    return {"message": "Resultado guardado correctamente"}

@app.get("/results")
async def get_results():
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, "r") as f:
            results = json.load(f)
    else:
        results = []
    return results


