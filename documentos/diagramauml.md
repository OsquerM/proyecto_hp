# Diagrama de Clases UML (JavaScript)

## Clases

### QuizManager
- **Atributos:**
  - preguntas[]
- **Métodos:**
  - añadirPregunta()
  - borrarPregunta()
  - recargarPregunta()
  - renderizarPreguntaEnLaTabla()
- **Relaciones:**
  - Contiene `Question` (Agregación)

---

### Question
- **Atributos:**
  - texto
  - opciones[]
  - imagenes[]
- **Métodos:**
  - constructor()
  - renderHTML()
- **Relaciones:**
  - Contiene `Option` (Composición)

---

### Option
- **Atributos:**
  - texto
  - casa
- **Métodos:**
  - constructor()
