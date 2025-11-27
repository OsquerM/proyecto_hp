document.addEventListener("DOMContentLoaded", () => {

  // ===================================================
  // FUNCIONES AUXILIARES PARA SUBIR ARCHIVOS
  // ===================================================
  async function subirArchivo(fileInput) {
    const file = fileInput.files[0];
    if (!file) return ""; // Si no hay archivo, retorna vacío

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/upload-image", { method: "POST", body: formData });
      const data = await res.json();
      return `/frontend/imagenes/${data.filename}`; // ruta que luego usará el quiz
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      return "";
    }
  }

  // ===================================================
  // AÑADIR PREGUNTA
  // ===================================================
  const formPregunta = document.getElementById("form-pregunta");
  formPregunta.addEventListener("submit", async e => {
    e.preventDefault();

    // Subir todas las imágenes
    const images = await Promise.all([
      subirArchivo(document.getElementById("file1")),
      subirArchivo(document.getElementById("file2")),
      subirArchivo(document.getElementById("file3")),
      subirArchivo(document.getElementById("file4"))
    ]);

    const nuevaPregunta = {
      question: document.getElementById("texto-pregunta").value,
      images,
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
      formPregunta.reset();
      cargarPreguntas();
    } catch (err) {
      console.error(err);
    }
  });

  // ===================================================
  // CARGAR PREGUNTAS
  // ===================================================
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
        <td>${q.images.map(img => img ? `<img src="${img}" width="80">` : "").join("<br>")}</td>
        <td><button class="btn btn-danger btn-sm" onclick="borrarPregunta(${i})">Borrar</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ===================================================
  // BORRAR PREGUNTA
  // ===================================================
  window.borrarPregunta = async (index) => {
    await fetch(`/questions/${index}`, { method: "DELETE" });
    cargarPreguntas();
  };

  // ===================================================
  // INICIALIZAR
  // ===================================================
  cargarPreguntas();

});
