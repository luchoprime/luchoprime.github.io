// Lista de eventos disponibles (cada objeto incluye la propiedad "description")
const allEvents = [
  { id: 1, title: "Descubrimiento del número cero", date: -500, img: "images/cero.jpg", description: "¿Cuándo se utilizó por primera vez el concepto del cero? Explora su origen en la antigua India." },
  { id: 2, title: "Pascal y la teoría de probabilidades", date: 1654, img: "images/pascal.jpg", description: "¿Qué aportes hizo Pascal en la teoría de probabilidades? Descubre su impacto en la estadística." },
  { id: 3, title: "La fórmula de Herón", date: 100, img: "images/heron.jpg", description: "¿Cómo calculaba Herón el área de un triángulo? Observa su ingeniosa fórmula." },
  { id: 4, title: "Teorema de Pitágoras", date: -500, img: "images/pitagoras.jpg", description: "¿Qué demuestra el teorema de Pitágoras? Reflexiona sobre su importancia en la geometría." },
  { id: 5, title: "Sistema decimal", date: 500, img: "images/decimal.jpg", description: "¿Cuándo se popularizó el sistema decimal? Explora cómo facilitó las matemáticas." },
  { id: 6, title: "El número Pi (π)", date: -2500, img: "images/pi.jpg", description: "¿Cuándo se utilizó por primera vez el número π? Investiga las primeras aproximaciones en la antigüedad." },
  { id: 7, title: "Geometría Euclidiana", date: -300, img: "images/euclides.jpg", description: "¿Qué hizo Euclides con la geometría? Conoce la sistematización en 'Los Elementos'." },
  { id: 8, title: "Números primos", date: -300, img: "images/primos.jpg", description: "¿Cómo se demostró la infinitud de los números primos? Descubre el legado de Euclides." },
  { id: 9, title: "Teorema Fundamental del Álgebra", date: 1799, img: "images/gauss-algebra.jpg", description: "¿Por qué es tan importante el teorema fundamental del álgebra? Explora su significado en la resolución de ecuaciones." },
  { id: 10, title: "Cálculo Diferencial e Integral", date: 1666, img: "images/calculo.jpg", description: "¿Cómo surgió el cálculo? Reflexiona sobre el trabajo de Newton y Leibniz." },
  { id: 11, title: "Regla de los signos", date: 1550, img: "images/signos.jpg", description: "¿Qué nos dice la regla de los signos en álgebra? Observa cómo determina los resultados." },
  { id: 12, title: "Notación decimal (Fibonacci)", date: 1202, img: "images/fibonacci.jpg", description: "¿Cómo influyó Fibonacci en la notación decimal? Analiza su legado en la aritmética." },
  { id: 13, title: "Teorema de Fermat", date: 1637, img: "images/fermat.jpg", description: "¿Qué misterio encerraba el teorema de Fermat? Piensa en su desafío durante siglos." },
  { id: 14, title: "Fracciones continuas", date: 1768, img: "images/fracciones.jpg", description: "¿Cómo se utilizan las fracciones continuas en matemáticas? Explora sus aplicaciones." },
  { id: 15, title: "Sucesión de Fibonacci", date: 1202, img: "images/fibonacci2.jpg", description: "¿Por qué es famosa la sucesión de Fibonacci? Descubre su presencia en la naturaleza." },
  { id: 16, title: "El número de Euler (e)", date: 1731, img: "images/euler.jpg", description: "¿Qué papel juega el número e en el cálculo? Investiga su relevancia en las matemáticas." },
  { id: 17, title: "Trigonometría", date: -150, img: "images/trigonometria.jpg", description: "¿Cómo se estudian las relaciones entre ángulos y lados? Reflexiona sobre los inicios de la trigonometría." },
  { id: 18, title: "Integral de Riemann", date: 1854, img: "images/riemann.jpg", description: "¿Cómo se define la integral en el análisis? Observa la aportación de Riemann." },
  { id: 19, title: "Funciones algebraicas", date: 1600, img: "images/funciones.jpg", description: "¿Cuál fue el avance en el estudio de funciones? Explora sus fundamentos en el análisis." },
  { id: 20, title: "Teoría de conjuntos (Cantor)", date: 1874, img: "images/cantor.jpg", description: "¿Qué revolucionó la teoría de conjuntos? Descubre la noción de infinito de Cantor." }
];

let selectedEvents = [];
let correctOrder = [];
let attemptCount = 0;
const maxAttempts = 3;
let score = 0;
let timeLeft = 120; // 2 minutos en segundos
let timerInterval = null;
let avisoReproducido = false;

// Referencias a elementos HTML
const bannerDiv = document.getElementById("banner");
const startButton = document.getElementById("startButton");
const timerDiv = document.getElementById("timer");
const cardsContainer = document.getElementById("cards-container");
const timelineDiv = document.getElementById("timeline");
const checkButton = document.getElementById("checkButton");
const restartButton = document.getElementById("restartButton");
const resultDiv = document.getElementById("result");
const detailPanel = document.getElementById("detail-panel");
const detailDescription = document.getElementById("detail-description");
const audioInicio = document.getElementById("inicio");
const audioFondo = document.getElementById("fondo");
const audioComplete = document.getElementById("complete");
const audioIncompleto = document.getElementById("incompleto");
const audioCeropuntos = document.getElementById("ceropuntos");
const audioAviso = document.getElementById("aviso");

// Función para detener todos los sonidos para evitar solapamientos
function stopAllAudio() {
  audioFondo.pause();
  audioInicio.pause();
  audioAviso.pause();
  audioFondo.currentTime = 0;
  audioInicio.currentTime = 0;
  audioAviso.currentTime = 0;
}

// Función para formatear el tiempo en MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Función para actualizar el temporizador
function updateTimer() {
  timerDiv.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;
  if (timeLeft === 30 && !avisoReproducido) {
    stopAllAudio();
    audioAviso.play();
    avisoReproducido = true;
  }
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endGameDueToTime();
  }
  timeLeft--;
}

// Función para iniciar el temporizador
function startTimer() {
  timerDiv.style.display = "block";
  timerDiv.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;
  timerInterval = setInterval(updateTimer, 1000);
}

// Función que se ejecuta cuando se agota el tiempo
function endGameDueToTime() {
  stopAllAudio();
  let correctCount = 0;
  document.querySelectorAll(".dropzone").forEach((zone, index) => {
    if (zone.firstChild) {
      const card = zone.firstChild;
      card.classList.remove("selected");
      if (parseInt(card.dataset.id) === correctOrder[index]) {
        card.classList.add("correct"); // Sombra verde para acertadas
        const dateP = card.querySelector(".date");
        if (dateP) dateP.style.display = "block";
        correctCount++;
      }
    }
  });
  
  // Calcular el puntaje según correctCount
  if (correctCount >= 6) {
    score = 5;
  } else if (correctCount >= 4) {
    score = 3;
  } else if (correctCount === 3) {
    score = 2;
  } else if (correctCount >= 1) {
    score = 1;
  } else {
    score = 0;
  }
  
  timerDiv.style.display = "none";
  checkButton.style.display = "none";
  if (score === 5) {
    resultDiv.textContent = `¡Excelente! Has colocado correctamente todas las cartas. Puntaje: ${score} - ¡Juego excelente!`;
    audioComplete.play();
  } else if (score === 0) {
    resultDiv.textContent = `¡Tiempo agotado! No lograste ninguna carta correcta. Puntaje: ${score} - ¡Mucho ánimo, prepárate para la próxima ocasión!`;
    audioCeropuntos.play();
  } else {
    const puntosTexto = score === 1 ? "punto" : "puntos";
    resultDiv.textContent = `¡Tiempo agotado! Tienes ${score} ${puntosTexto}. Puntaje: ${score} - ¡Sigue esforzándote!`;
    audioIncompleto.play();
  }
  restartButton.style.display = "inline-block";
}

// Función para mezclar un array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para inicializar o reiniciar el juego
// El parámetro showBanner indica si se muestra el banner (true al reiniciar) o no (false al comenzar)
function initializeGame(showBanner = true) {
  attemptCount = 0;
  score = 0;
  timeLeft = 120;
  avisoReproducido = false;
  checkButton.disabled = false;
  resultDiv.textContent = '';
  
  // Ocultar elementos de juego
  timerDiv.style.display = "none";
  cardsContainer.style.display = "none";
  timelineDiv.style.display = "none";
  checkButton.style.display = "none";
  restartButton.style.display = "none";
  detailPanel.style.display = "none";
  
  // En esta inicialización, dejamos intacto el contenido del elemento ".instruction"
  // para que se conserve el mensaje actualizado después de presionar "Comenzar".
  
  // Mostrar u ocultar el banner según el parámetro
  bannerDiv.style.display = showBanner ? "block" : "none";
  
  // Seleccionar aleatoriamente 7 eventos
  selectedEvents = shuffle(allEvents.slice()).slice(0, 7);
  
  // Calcular el orden correcto (ascendente según fecha)
  correctOrder = selectedEvents.slice().sort((a, b) => a.date - b.date).map(e => e.id);
  
  // Limpiar dropzones
  document.querySelectorAll(".dropzone").forEach(zone => {
    zone.innerHTML = '';
  });
  
  // Limpiar contenedor de cartas (sin mensaje hint)
  cardsContainer.innerHTML = '';
  
  // Crear las cartas (con descripción en dataset)
  const shuffledCards = shuffle(selectedEvents.slice());
  shuffledCards.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");
    card.dataset.id = event.id;
    card.dataset.date = event.date;
    card.dataset.description = event.description;
    
    const img = document.createElement("img");
    img.src = event.img;
    img.alt = event.title;
    
    const titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.textContent = event.title;
    
    const dateP = document.createElement("p");
    dateP.classList.add("date");
    dateP.textContent = `(${event.date})`;
    dateP.style.display = "none";
    
    card.appendChild(img);
    card.appendChild(titleP);
    card.appendChild(dateP);
    
    card.addEventListener("dragstart", dragStart);
    // Soporte táctil para móviles
    card.addEventListener("touchstart", handleTouchStart, { passive: false });
    card.addEventListener("touchmove", handleTouchMove, { passive: false });
    card.addEventListener("touchend", handleTouchEnd, { passive: false });
    // Al hacer click, agregar la clase 'selected' (sombra naranja) y mostrar el detalle (solo descripción)
    card.addEventListener("click", () => {
      document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      showDetail(card);
    });
    
    cardsContainer.appendChild(card);
  });
}

// Función para mostrar detalle (solo descripción) de la carta seleccionada
function showDetail(card) {
  const description = card.dataset.description;
  detailDescription.textContent = description;
  detailPanel.style.display = "block";
}

// Función para iniciar el arrastre (drag)
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.closest(".card").dataset.id);
}

// Funciones para soporte táctil en móviles
function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  target.dataset.offsetX = touch.clientX - rect.left;
  target.dataset.offsetY = touch.clientY - rect.top;
  target.style.position = "absolute";
  target.style.zIndex = "1000";
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const target = e.currentTarget;
  const offsetX = parseFloat(target.dataset.offsetX);
  const offsetY = parseFloat(target.dataset.offsetY);
  target.style.left = (touch.clientX - offsetX) + "px";
  target.style.top = (touch.clientY - offsetY) + "px";
}

function handleTouchEnd(e) {
  e.preventDefault();
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let dropped = false;
  document.querySelectorAll(".dropzone").forEach(zone => {
    const zoneRect = zone.getBoundingClientRect();
    if (centerX >= zoneRect.left && centerX <= zoneRect.right &&
        centerY >= zoneRect.top && centerY <= zoneRect.bottom) {
      zone.appendChild(target);
      dropped = true;
    }
  });
  if (!dropped) {
    cardsContainer.appendChild(target);
  }
  target.style.position = "";
  target.style.left = "";
  target.style.top = "";
  target.style.zIndex = "";
}

// Funciones para permitir el arrastre sobre una zona (drag over/leave)
function dragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add("over");
}

function dragLeave(e) {
  e.currentTarget.classList.remove("over");
}

// Función para soltar la carta en una dropzone (drag drop)
function dropCard(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text/plain");
  const card = document.querySelector(`.card[data-id='${id}']`);
  if (card) {
    if (e.currentTarget.firstChild) {
      cardsContainer.appendChild(e.currentTarget.firstChild);
    }
    e.currentTarget.appendChild(card);
  }
}

// Función para soltar la carta en el contenedor (drag drop)
function dropToContainer(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text/plain");
  const card = document.querySelector(`.card[data-id='${id}']`);
  if (card) {
    cardsContainer.appendChild(card);
  }
}

// Asignar eventos a las dropzones
document.querySelectorAll(".dropzone").forEach(zone => {
  zone.addEventListener("dragover", dragOver);
  zone.addEventListener("dragleave", dragLeave);
  zone.addEventListener("drop", dropCard);
});

// Asignar eventos al contenedor de cartas
cardsContainer.addEventListener("dragover", dragOver);
cardsContainer.addEventListener("dragleave", dragLeave);
cardsContainer.addEventListener("drop", dropToContainer);

// Evento para el botón de Comprobar Orden
checkButton.addEventListener("click", () => {
  attemptCount++;
  let correctCount = 0;
  document.querySelectorAll(".dropzone").forEach((zone, index) => {
    if (zone.firstChild) {
      const card = zone.firstChild;
      card.classList.remove("selected"); // Elimina la sombra naranja de selección
      if (parseInt(card.dataset.id) === correctOrder[index]) {
        card.classList.add("correct"); // Aplica sombra verde para acertadas
        const dateP = card.querySelector(".date");
        if (dateP) dateP.style.display = "block";
        correctCount++;
      }
    }
  });
  
  // Calcular el puntaje según correctCount
  if (correctCount >= 6) {
    score = 5;
  } else if (correctCount >= 4) {
    score = 3;
  } else if (correctCount === 3) {
    score = 2;
  } else if (correctCount >= 1) {
    score = 1;
  } else {
    score = 0;
  }
  
  // Mostrar mensaje usando "punto" o "puntos" basado en el score
  const puntosTexto = score === 1 ? "punto" : "puntos";
  resultDiv.textContent = `Tienes ${score} ${puntosTexto}. Intento ${attemptCount} de ${maxAttempts}.`;
  
  if (correctCount === selectedEvents.length) {
    resultDiv.textContent = `¡Excelente! Has colocado correctamente todas las cartas. Puntaje: ${score} - ¡Juego excelente!`;
    stopAllAudio();
    audioComplete.play();
    checkButton.style.display = "none";
    clearInterval(timerInterval);
    timerDiv.style.display = "none";
    restartButton.style.display = "inline-block";
  } else if (attemptCount >= maxAttempts) {
    let mensaje = "";
    if (score === 0) {
      mensaje = `¡Has terminado la partida! No lograste ninguna carta correcta. Puntaje: ${score} - ¡Mucho ánimo, prepárate para la próxima ocasión!`;
      stopAllAudio();
      audioCeropuntos.play();
    } else {
      mensaje = `¡Has terminado la partida! Tienes ${score} ${puntosTexto}. Puntaje: ${score} - ¡Sigue esforzándote!`;
      stopAllAudio();
      audioIncompleto.play();
    }
    resultDiv.textContent = mensaje;
    checkButton.style.display = "none";
    clearInterval(timerInterval);
    timerDiv.style.display = "none";
    restartButton.style.display = "inline-block";
  }
});

// Evento para el botón de Reiniciar Juego
restartButton.addEventListener("click", () => {
  bannerDiv.style.display = "block"; // Mostrar el banner al reiniciar
  startButton.style.display = "inline-block";
  checkButton.style.display = "none";
  resultDiv.style.display = "none";
  if (timerInterval) clearInterval(timerInterval);
  initializeGame(true);
  timerDiv.style.display = "none";
  detailPanel.style.display = "none";
});

// Evento para el botón de Comenzar
startButton.addEventListener("click", () => {
  // Actualizar el mensaje de instrucciones debajo del título
  document.querySelector(".instruction").textContent = "Arrastra las cartas a la línea de tiempo y ordénalas correctamente. Al dar click en una carta, verás una descripción del evento.";
  bannerDiv.style.display = "none"; // Ocultar el banner al comenzar
  initializeGame(false);
  timerDiv.style.display = "block";
  cardsContainer.style.display = "flex";
  timelineDiv.style.display = "flex";
  checkButton.style.display = "inline-block";
  resultDiv.style.display = "block";
  startButton.style.display = "none";
  
  startTimer();
  
  stopAllAudio();
  audioInicio.play();
  audioInicio.onended = function() {
    audioFondo.play();
  };
});
