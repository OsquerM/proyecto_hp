A. Historias de Usuario Técnicas

HU-01: Añadir Pregunta (Admin)

Evento: submit en #form-pregunta

Acción: Se crea un objeto Question y se guarda en questions.json

DOM: Se añade una fila en #tabla-preguntas con pregunta, opciones e imágenes

HU-02: Borrar Pregunta (Admin)

Evento: Click en botón Borrar de la fila

Acción: Se elimina la pregunta de questions.json

DOM: Se elimina la fila correspondiente

HU-03: Ver Preguntas (Admin/Usuario)

Evento: Carga de panel.html

Acción: Se leen las preguntas de questions.json

DOM: Se renderizan todas las filas de la tabla con opciones e imágenes