// Ejemplo de añadir pregunta
document.getElementById("form-pregunta").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaPregunta = {
    question: document.getElementById("texto-pregunta").value,
    images: [
      document.getElementById("imagen1").value,
      document.getElementById("imagen2").value,
      document.getElementById("imagen3").value,
      document.getElementById("imagen4").value
    ],
    options: [
      { text: document.getElementById("opcion1-texto").value, house: document.getElementById("opcion1-casa").value },
      { text: document.getElementById("opcion2-texto").value, house: document.getElementById("opcion2-casa").value },
      { text: document.getElementById("opcion3-texto").value, house: document.getElementById("opcion3-casa").value },
      { text: document.getElementById("opcion4-texto").value, house: document.getElementById("opcion4-casa").value }
    ]
  };

  fetch("http://127.0.0.1:8000/add-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaPregunta)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("mensaje-exito").classList.remove("d-none");
    document.getElementById("form-pregunta").reset();
  })
  .catch(err => console.error("Error añadiendo pregunta:", err));
});
