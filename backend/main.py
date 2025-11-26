from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json, os, shutil

app = FastAPI()

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar carpeta estática para CSS, JS, imágenes
app.mount("/static", StaticFiles(directory="static"), name="static")

# Archivos JSON
RESULTS_FILE = "results.json"
QUESTIONS_FILE = "questions.json"

# Modelos
class QuizResult(BaseModel):
    username: str
    house: str

class Option(BaseModel):
    text: str
    house: str

class Question(BaseModel):
    question: str
    options: list[Option]
    images: list[str]

# Endpoints resultados quiz
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


class LoginData(BaseModel):
    user: str
    password: str

ADMIN_USER = "admin"
ADMIN_PASS = "1234"

@app.post("/login")
async def login(data: LoginData):
    if data.user == ADMIN_USER and data.password == ADMIN_PASS:
        return {"success": True}
    return JSONResponse(status_code=401, content={"success": False, "message": "Usuario o contraseña incorrectos"})
# Subir imagenes
@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    os.makedirs("static/imagenes", exist_ok=True)
    path = f"static/imagenes/{file.filename}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"filename": file.filename}

# Añadir pregunta
@app.post("/add-question")
async def add_question(question: Question):
    if os.path.exists(QUESTIONS_FILE):
        with open(QUESTIONS_FILE, "r") as f:
            questions = json.load(f)
    else:
        questions = []

    questions.append(question.dict())
    with open(QUESTIONS_FILE, "w") as f:
        json.dump(questions, f, indent=4)
    return {"message": "Pregunta añadida correctamente"}

# Listar preguntas
@app.get("/questions")
async def get_questions():
    if os.path.exists(QUESTIONS_FILE):
        with open(QUESTIONS_FILE, "r") as f:
            questions = json.load(f)
    else:
        questions = []
    return questions

# Borrar pregunta por índice
@app.delete("/questions/{index}")
async def delete_question(index: int):
    if os.path.exists(QUESTIONS_FILE):
        with open(QUESTIONS_FILE, "r") as f:
            questions = json.load(f)
        if 0 <= index < len(questions):
            questions.pop(index)
            with open(QUESTIONS_FILE, "w") as f:
                json.dump(questions, f, indent=4)
            return {"message": "Pregunta borrada correctamente"}
    return JSONResponse(status_code=404, content={"message": "Pregunta no encontrada"})
