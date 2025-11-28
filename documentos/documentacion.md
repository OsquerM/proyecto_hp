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

### 3.4 Implementar conexión con backend

* Usar `axios` para llamadas a FastAPI.
* Manejar estados con `useState` y `useEffect`.

### 3.5 Estilizar con Bootstrap

* Navbar, tarjetas, botones y formularios.
* Diseño responsivo para móviles y tablets.


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
