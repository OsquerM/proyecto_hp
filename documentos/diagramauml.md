# Diagrama de Clases UML (JavaScript)

## Clases

### QuizManager
- **Atributos:**
  - questions[]
- **Métodos:**
  - addQuestion()
  - deleteQuestion()
  - loadQuestions()
  - renderQuestionsTable()
- **Relaciones:**
  - Contiene `Question` (Agregación)

---

### Question
- **Atributos:**
  - text
  - options[]
  - images[]
- **Métodos:**
  - constructor()
  - renderHTML()
- **Relaciones:**
  - Contiene `Option` (Composición)

---

### Option
- **Atributos:**
  - text
  - house
- **Métodos:**
  - constructor()
