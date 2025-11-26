document.getElementById("form-pregunta").addEventListener("submit", async e => {
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

  try {
    await fetch("/add-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaPregunta)
    });
    document.getElementById("mensaje-pregunta").classList.remove("d-none");
    document.getElementById("form-pregunta").reset();
    cargarPreguntas();
  } catch (err) {
    console.error(err);
  }
});

async function cargarPreguntas() {
  const res = await fetch("/questions");
  const questions = await res.json();
  const tbody = document.getElementById("tabla-preguntas").querySelector("tbody");
  tbody.innerHTML = "";
  questions.forEach((q, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i}</td>
      <td>${q.question}</td>
      <td>${q.options.map(o => `${o.text} (${o.house})`).join("<br>")}</td>
      <td>${q.images.join("<br>")}</td>
      <td><button class="btn btn-danger btn-sm" onclick="borrarPregunta(${i})">Borrar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function borrarPregunta(index) {
  await fetch(`/questions/${index}`, { method: "DELETE" });
  cargarPreguntas();
}

// Inicializa al cargar
cargarPreguntas();
