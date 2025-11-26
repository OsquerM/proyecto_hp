from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json, os

app = FastAPI()

# Servir todo el frontend desde la carpeta 'frontend'
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# Archivos JSON
QUESTIONS_FILE = "backend/questions.json"
RESULTS_FILE = "backend/results.json"
# Modelos
class Option(BaseModel):
    text: str
    house: str

class Question(BaseModel):
    question: str
    options: list[Option]
    images: list[str]

class LoginData(BaseModel):
    user: str
    password: str

ADMIN_USER = "admin"
ADMIN_PASS = "1234"

# Rutas HTML
@app.get("/")
async def login_page():
    return FileResponse("frontend/login.html")

@app.get("/panel")
async def panel_page():
    return FileResponse("frontend/panel.html")

# Login
@app.post("/login")
async def login(data: LoginData):
    if data.user == ADMIN_USER and data.password == ADMIN_PASS:
        return {"success": True}
    return JSONResponse(status_code=401, content={"success": False, "message": "Usuario o contraseña incorrectos"})

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

# Borrar pregunta
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
