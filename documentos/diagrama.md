# Diagrama Entidad-Relación

## Entidades

**Admin**
- usuario
- email

**Usuario**
- usuario

**Pregunta**
- pregunta
- imagenes[]

**Opción**
- texto
- casa

**Resultado**
- usuario
- casa

**Imagen**
- url

---

## Relaciones

- **Admin 1:N Pregunta**  
  Un admin puede crear muchas preguntas; cada pregunta es creada por un admin.

- **Pregunta 1:N Opción**  
  Una pregunta puede tener muchas opciones; cada opción pertenece a una pregunta.

- **Pregunta 1:N Imagen**  
  Una pregunta puede tener muchas imágenes; cada imagen pertenece a una pregunta.

- **Usuario 1:N Resultado**  
  Un usuario puede tener muchos resultados; cada resultado pertenece a un usuario.
