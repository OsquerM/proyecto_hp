document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const startContainer = document.getElementById('start-container');
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const resultHouse = document.getElementById("result-house");
  const questionText = document.getElementById("question-text");
  const imagesGrid = document.querySelector(".images-grid");
  const optionsGrid = document.querySelector(".options-grid");
  const houseImage = document.getElementById("house-image");

  // Preguntas predeterminadas
  let questions = [
    {
      question: "¿Qué animal te llevarías a Hogwarts?",
      images: ["rata.jpg", "lechuza.jpg", "escarbato.jpg", "gato.jpg"],
      options: [
        { text: "Rata", house: "Slytherin" },
        { text: "Lechuza", house: "Ravenclaw" },
        { text: "Escarbato", house: "Hufflepuff" },
        { text: "Gato", house: "Gryffindor" }
      ]
    },
    {
      question: "¿Qué cualidad valoras más?",
      images: ["valentia.jpg", "lealtad.jpg", "sabiduria.jpg", "astucia.png"],
      options: [
        { text: "Valentía", house: "Gryffindor" },
        { text: "Lealtad", house: "Hufflepuff" },
        { text: "Sabiduría", house: "Ravenclaw" },
        { text: "Astucia", house: "Slytherin" }
      ]
    },
    {
      question: "¿Qué hechizo usarías?",
      images: ["expelliarmus.gif", "avada.gif", "protego.gif", "immobulus.gif"],
      options: [
        { text: "Expelliarmus", house: "Gryffindor" },
        { text: "Avada Kedavra", house: "Slytherin" },
        { text: "Protego", house: "Hufflepuff" },
        { text: "Immobilus", house: "Ravenclaw" }
      ]
    },
    {
      question: "¿Qué objeto utilizarías?",
      images: ["recordadora.gif", "escoba.gif", "mapa.gif", "gira.gif"],
      options: [
        { text: "Recordadora", house: "Gryffindor" },
        { text: "Escoba", house: "Slytherin" },
        { text: "Mapa Del Merodeador", house: "Hufflepuff" },
        { text: "Gira Tiempo", house: "Ravenclaw" }
      ]
    },
    {
      question: "¿Qué clase es tu preferida?",
      images: ["vuelo.gif", "dcao.gif", "herbologia.gif", "pociones.gif"],
      options: [
        { text: "Vuelo", house: "Gryffindor" },
        { text: "Defensa Contra las Artes Oscuras", house: "Slytherin" },
        { text: "Herbología", house: "Hufflepuff" },
        { text: "Pociones", house: "Ravenclaw" }
      ]
    },
    {
      question: "¿De qué está hecha tu varita?",
      images: ["sauco.jpg", "acebo.jpg", "vid.jpg", "draco.jpg"],
      options: [
        { text: "Sauco", house: "Gryffindor" },
        { text: "Acebo", house: "Slytherin" },
        { text: "Vid", house: "Hufflepuff" },
        { text: "Espino", house: "Ravenclaw" }
      ]
    },
    {
      question: "¿A qué preferirías enfrentarte?",
      images: ["troll.gif", "dementor.gif", "sirena.gif", "dragon.gif"],
      options: [
        { text: "Troll", house: "Gryffindor" },
        { text: "Dementor", house: "Slytherin" },
        { text: "Sirena", house: "Hufflepuff" },
        { text: "Dragón", house: "Ravenclaw" }
      ]
    },
    {
      question: "Elige un transporte mágico",
      images: ["escoba1.gif", "coche.gif", "red.gif", "aparicion.gif"],
      options: [
        { text: "Escoba", house: "Gryffindor" },
        { text: "Coche Volador", house: "Slytherin" },
        { text: "Red Flú", house: "Hufflepuff" },
        { text: "Aparición", house: "Ravenclaw" }
      ]
    }
  ];

  let currentQuestion = 0;
  const score = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
  let backendLoaded = false;

  async function cargarPreguntasBackend() {
    if (backendLoaded) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/backend/questions");
      if (!res.ok) throw new Error("No se pudieron cargar preguntas del backend");
      const nuevas = await res.json();
      nuevas.forEach(p => {
        if (p.question && p.options && p.images) questions.push(p);
      });
      backendLoaded = true;
    } catch (err) {
      console.error("Error cargando preguntas del backend:", err);
    }
  }

  function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;

    imagesGrid.innerHTML = "";
    q.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src.startsWith("/frontend/imagenes/") ? src : `/frontend/imagenes/${src}`;
      img.classList.add("img-fluid", "rounded");
      imagesGrid.appendChild(img);
    });

    optionsGrid.innerHTML = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-outline-light");
      btn.textContent = opt.text;
      btn.addEventListener("click", () => selectAnswer(opt.house));
      optionsGrid.appendChild(btn);
    });
  }

  function selectAnswer(house) {
    score[house] += 1;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizContainer.classList.add("d-none");
    resultContainer.classList.remove("d-none");

    let maxPoints = 0;
    let winnerHouse = "";
    for (const house in score) {
      if (score[house] > maxPoints) {
        maxPoints = score[house];
        winnerHouse = house;
      }
    }

    resultHouse.textContent = winnerHouse;
    houseImage.src = `/frontend/imagenes/casas/${winnerHouse.toLowerCase()}.jpg`;
    houseImage.alt = winnerHouse;

    const usernameInput = document.getElementById("username");
    const username = usernameInput ? usernameInput.value || "Anonimo" : "Anonimo";

    fetch("http://127.0.0.1:8000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, house: winnerHouse })
    })
    .then(res => res.json())
    .then(data => console.log("Resultado enviado:", data))
    .catch(err => console.error("Error enviando resultado:", err));
  }

  startBtn.addEventListener('click', async () => {
    await cargarPreguntasBackend();
    startContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    currentQuestion = 0;
    showQuestion();
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    for (let h in score) score[h] = 0;
    resultContainer.classList.add("d-none");
    startContainer.classList.remove('d-none');
  });
});
