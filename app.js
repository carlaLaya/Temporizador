const html = document.querySelector("html");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll(".app__card-button");

const InputEnfoqueMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
const botonIniciarPausar = document.querySelector("#start-pause");
const textoIniciarPausar = document.querySelector("#start-pause span");
const tiempoEnPantalla = document.querySelector("#timer");

const audioPlay = new Audio("./sonidos/play.wav");
const audioPausa = new Audio("./sonidos/pause.mp3");
const audioTiempoFinalizado = new Audio("./sonidos/beep.mp3");

// MANIPULO EL TENMPORIZADOR

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

// MANIPULO MUSICA

musica.loop = true; // con loop le indico que la musica se va a escuahr hasta que vuelva a tocar el boton musica

InputEnfoqueMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
    musica.volume = 0.5; // con volume le indico el volumen de la musica
  } else {
    musica.pause();
  }
});

// MANIPULO BOTONES
botonCorto.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 300;
  cambiarContexto("descanso-corto");
  botonCorto.classList.add("active"); // Agrego la clase
});

botonEnfoque.addEventListener("click", () => {
  tiempoTranscurridoEnSegundos = 1500;
  cambiarContexto("enfoque");
  botonEnfoque.classList.add("active");
});

botonLargo.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos =900;

  cambiarContexto("descanso-largo");
  botonLargo.classList.add("active");
});

// FUNCION PARA CAMBIAR EL CONTEXTO

function cambiarContexto(contexto) {
    mostrarTiempo()
  botones.forEach(function (contexto) {
    contexto.classList.remove("active"); // Remuevo la clase
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagenes/${contexto}.png`);

  // CAMBIO EL TITULO SEGUN EL CONTEXTO

  switch (contexto) {
    case "enfoque":
      titulo.innerHTML = `
        Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
        `;
      break;
    case "descanso-corto":
      titulo.innerHTML = `
        ¿Qué tal tomar un descanso?
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
        `;
      break;
    case "descanso-largo":
      titulo.innerHTML = `
        ¿Hora de voler a la superficie?
                <strong class="app__title-strong">¡Haz una pausa larga!</strong>
        `;
    default:
      break;
  }
}
// BOTON INICIAR PAUSAR

const cuentaRegresiva = () => {
  if (tiempoTranscurridoEnSegundos <= 0) {
    audioTiempoFinalizado.play();
    alert("Tiempo finalizado");
    reiniciar();
    return;
  }
  textoIniciarPausar.textContent = "Pausar";
  tiempoTranscurridoEnSegundos -= 1;
mostrarTiempo();
};

botonIniciarPausar.addEventListener("click", iniciarPausar);



function iniciarPausar() {
  if (idIntervalo) {
    audioPausa.play();
    reiniciar();
    return; // retorno anticipado -- circuit breaker
  }
  audioPlay.play();
  idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
  clearInterval(idIntervalo);
  idIntervalo = null;
textoIniciarPausar.textContent = "Comenzar";
}


// MUESTRO EL TEMPORIZADOR

function mostrarTiempo() {
    const tiempo = new Date (tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR', {minute: '2-digit' , second: '2-digit'} );    
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo() //llamo a la funcion para que aparezca siempor en pantalla