# Documentación de Pasos para Proyecto Selector de Casas de Hogwarts

## 1. Configuración del Proyecto

### 1.1 Crear estructura de carpetas

```
proyecto-hogwarts/
├── backend/
├── frontend/
├── db/
└── docker-compose.yml
```
## 2. Backend (FastAPI)

### 2.1 Crear entorno virtual

```
python -m venv venv
venv\Scripts\activate     # Windows
```

### 2.2 Instalar dependencias

```
pip install fastapi uvicorn sqlalchemy pydantic passlib python-jose[cryptography] psycopg2-binary
```

### 2.3 Estructura básica

```
backend/
├── main.py
├── models.py
├── schemas.py
├── database.py
├── crud.py
└── auth.py
```

### 2.4 Configurar base de datos

* Usar PostgreSQL o MySQL.
* Crear tablas `usuarios` y `resultados`.
* Conectar con SQLAlchemy en `database.py`.

### 2.5 Crear endpoints

* `POST /register` → registrar usuario
* `POST /login` → autenticar usuario y devolver JWT
* `GET /quiz` → obtener preguntas
* `POST /quiz` → enviar respuestas y calcular casa
* `GET /results` → historial de resultados de usuario

### 2.6 Implementar autenticación y roles

* JWT tokens para manejar sesiones.
* Roles: administrador, usuario registrado, usuario sin registro.
* Middleware para proteger rutas según rol.

### 2.7 Probar backend

```
uvicorn main:app --reload
```

## 3. Frontend (React + Bootstrap)

### 3.1 Crear proyecto React

```
npx create-react-app frontend
cd frontend
npm install bootstrap axios react-router-dom
```

### 3.2 Estructura de componentes

```
frontend/src/
├── App.js
├── components/
│   ├── Home.js
│   ├── Quiz.js
│   ├── Result.js
│   └── Profile.js
└── services/
    └── api.js
```

### 3.3 Configurar rutas con React Router

* `/` → Home
* `/quiz` → Quiz
* `/result` → Result
* `/profile` → Profile

### 3.4 Implementar conexión con backend

* Usar `axios` para llamadas a FastAPI.
* Manejar estados con `useState` y `useEffect`.

### 3.5 Estilizar con Bootstrap

* Navbar, tarjetas, botones y formularios.
* Diseño responsivo para móviles y tablets.

## 4. Docker

### 4.1 Crear Dockerfile Backend

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/ /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 4.2 Crear Dockerfile Frontend

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY frontend/ /app
RUN npm install && npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

### 4.3 docker-compose.yml

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: hogwarts
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgres://user:password@db:5432/hogwarts
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_data:
```

### 4.4 Levantar contenedores

```
docker-compose up --build
```

## 5. Nginx como proxy inverso

* Configurar Nginx para dirigir `proyecto-daw.iesabdera.local` a frontend y backend.
* Ejemplo de bloque de servidor:

```nginx
server {
    listen 80;
    server_name tu-dominio.local;

    location /api/ {
        proxy_pass http://backend:8000/;
    }

    location / {
        proxy_pass http://frontend:3000/;
    }
}
```

* Habilitar HTTPS con Let’s Encrypt o certificado autofirmado.

## 6. Integración con API externa (opcional)

* Usar `axios` en frontend o `requests` en backend.
* Ejemplo: mostrar clima de Hogwarts usando OpenWeather.
* Manejar errores y validar datos antes de mostrar.

## 7. Documentación y presentación

### 7.1 Manual Técnico

* Explicar arquitectura del sistema y decisiones técnicas.
* Incluir diagramas de base de datos y flujo de datos.
* Detallar configuración de Docker y Nginx.

### 7.2 Manual de Usuario

* Guía paso a paso para registrarse, hacer el quiz y ver resultados.
* Capturas de pantalla y FAQ.
* Solución de problemas comunes.

### 7.3 Presentación del proyecto

* Demostración en vivo del cuestionario y resultados.
* Explicación del backend y frontend.
* Responder preguntas sobre arquitectura y decisiones técnicas.
<!-- Probando el Jira -->