
# Tic Tac Toe

Este proyecto es una implementación del juego Tic Tac Toe (Tres en Raya) con múltiples modos de juego, incluyendo jugador vs jugador, jugador vs IA aleatoria, jugador vs IA Minimax y jugador vs IA Alpha-Beta.

## Estructura del Proyecto

- `index.html`: Contiene la estructura HTML del juego.
- `src/css/style.css`: Contiene los estilos CSS para el diseño del juego.
- `src/js/main.js`: Contiene la lógica del juego en JavaScript.

## index.html

```html

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tic Tac Toe</title>
  <link rel="stylesheet" href="src/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
</head>
<body>
  <h1>Tic Tac Toe</h1>
  <div class="game-container">
    <div class="menuPersonaje">
      <label>
        Jugador 1:
        <input type="text" id="nombreJugador1" placeholder="Nombre" />
      </label>
      <label>
        Jugador 2 / IA:
        <input type="text" id="nombreJugador2" placeholder="Nombre" />
      </label>
      <label>
        Modo de Juego:
        <select id="modoJuego">
          <option value="pvp">Jugador vs Jugador</option>
          <option value="aleatorio">Jugador vs Random</option>
          <option value="minimax">Jugador vs Minimax</option>
          <option value="alphaBeta">Jugador vs Minimax Alpha-Beta</option>
        </select>
      </label>
      <button id="iniciarJuego"><i class="fa fa-play"></i></button>
    </div>
    <div class="marcador">
      <h2>Marcador</h2>
      <p>X: <span id="marcadorX">0</span></p>
      <p>O: <span id="marcadorO">0</span></p>
      <p>Empate: <span id="empate">0</span></p>
      <button id="reiniciarMarcador"><i class="fa fa-redo"></i></button>
    </div>
    <div id="turnos" class="hidden">Turno de: X</div>
    <button id="reiniciar"><i class="fa fa-redo"></i></button>
    <div class="tablero" id="tablero">
      <div class="casilla" id="cell-0"></div>
      <div class="casilla" id="cell-1"></div>
      <div class="casilla" id="cell-2"></div>
      <div class="casilla" id="cell-3"></div>
      <div class="casilla" id="cell-4"></div>
      <div class="casilla" id="cell-5"></div>
      <div class="casilla" id="cell-6"></div>
      <div class="casilla" id="cell-7"></div>
      <div class="casilla" id="cell-8"></div>
    </div>
  </div>
  <script src="src/js/main.js"></script>
</body>
</html>
```

## src/css/style.css

```css
/* Definición de variables globales */
:root {
    --bg-color: #e0e5ec;
    --shadow-dark: #a3b1c6;
    --shadow-light: #ffffff;
    --border-radius: 15px;
    --box-shadow: 8px 8px 15px var(--shadow-dark), -8px -8px 15px var(--shadow-light);
    --box-shadow-inset: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light);
    --transition: all 0.3s ease;
    --background-gradient: 
        radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 100%, hsla(340, 100%, 76%, 1) 0px, transparent 50%);
}

/* Estilos generales del cuerpo */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
    background: var(--background-gradient) no-repeat fixed;
    padding: 20px;
    min-height: 100vh;
    margin: 0;
}

/* Estilos comunes para controles, tablero, marcador y menú de personaje */
.controls, .menuPersonaje, .game-container {
    background: var(--bg-color);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    width: 80%;
    max-width: 600px;
    margin-bottom: 20px;
    text-align: center;
}

#tablero {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    text-align: center;
    width: 100%;
    margin-right: 90%;
}

#turnos {
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
    padding: 10px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    width: 89%;
    height: 10%;
    text-align: center;
    justify-content: center;
}

/* Efecto de escala al hacer hover */
@media (hover: hover) {
    .tablero:hover{
        transform: scale(1.03);
    }
}

/* Estilos específicos para controles y menú de personaje */
.controls, .menuPersonaje {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Contenedor para el menú y el tablero */
.game-container {
    width: 1200px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.menuPersonaje { grid-area: 1 / 1 / 2 / 2; }
.marcador { grid-area: 1 / 2 / 2 / 3; }
.turnos { grid-area: 2 / 1 / 3 / 2; }
.tablero { grid-area: 2 / 2 / 3 / 3; }

/* Estilos del tablero de juego */
.tablero {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    aspect-ratio: 1 / 1;
    max-width: 300px;
}

/* Estilos de las casillas del tablero */
.casilla {
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10vw;
    font-weight: bold;
    cursor: pointer;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light);
    transition: var(--transition);
}

@media (min-width: 600px) {
    .casilla {
        font-size: 48px;
    }
}

/* Efectos de hover y active para casillas y botones */
@media (hover: hover) {
    .casilla:hover, button:hover {
        box-shadow: var(--box-shadow-inset);
        transform: scale(1.1);
    }
}

.casilla:active, .winning-cell {
    box-shadow: var(--box-shadow-inset);
    transform: scale(1.1);
}

/* Animación de rotación al hacer clic en una casilla */
.casilla:active {
    animation: rotate 0.5s linear;
}

/* Animación de rotación para el efecto de movimiento de la IA */
@keyframes rotate {
    from { 
        transform: rotate(0deg) scale(1.1); 
        box-shadow: var(--box-shadow-inset);
    }
    to { 
        transform: rotate(360deg) scale(1.1); 
        box-shadow: var(--box-shadow-inset);
    }
}

.casilla.rotate {
    animation: rotate 0.5s linear;
}

/* Estilos del marcador */
.marcador {
    background: var(--bg-color);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    width: 87%;
    max-width: 400px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    text-align: center;
}

#reiniciarMarcador {
    margin-top: 90px;
}

/* Estilos de los botones */
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: #4CAF50;
    background: var(--bg-color);
    border: none;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    width: 60px;
    max-width: 200px;
}

#reiniciar {
    position: relative;
    bottom: 720%;
    text-align: center;
    margin-left: 30px;
    width: 700px;;
    height: 100%;
}

/* Animación para las casillas ganadoras */
.winning-cell {
    animation: pulse 1s infinite;
    background-color: #4CAF50;
}

/* Estilos para las etiquetas del menú de personaje */
.menuPersonaje label {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

/* Estilos para los inputs del menú de personaje */
.menuPersonaje select {
    padding: 8px;
    border: none;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    box-shadow: var(--box-shadow-inset);
    transition: var(--transition);
    width: auto;
}
.menuPersonaje input {
    padding: 8px;
    border: none;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    box-shadow: var(--box-shadow-inset);
    transition: var(--transition);
    width: auto;
}

.menuPersonaje input:focus, .menuPersonaje select:focus {
    transform: scale(1.05);
}

/* Animación de pulso */
@keyframes pulse {
    0%, 100% { box-shadow: var(--box-shadow-inset); transform: scale(1); }
    50% { box-shadow: var(--box-shadow); transform: scale(1.05); }
}
```

## src/js/main.js

```javascript
// filepath: /c:/Users/Latitude 5490/tiktok/Final-Version-tic-tac-toe/src/js/main.js
/* Espera a que el DOM tenga todo el contenido cargado */
document.addEventListener("DOMContentLoaded", () => {
    /* Elementos del DOM necesarios */
    console.log("DOM fully loaded and parsed");
    const casillas = document.querySelectorAll(".casilla");
    const botonReiniciar = document.getElementById("reiniciar");
    const botonIniciar = document.getElementById("iniciarJuego");
    const seleccionModo = document.getElementById("modoJuego");
    const puntajeX = document.getElementById("marcadorX");
    const puntajeO = document.getElementById("marcadorO");
    const puntajeEmpate = document.getElementById("empate");
    const turnIndicator = document.getElementById("turnos");
    const gameOverlay = document.getElementById("gameOverlay");
    const botonReiniciarMarcador = document.getElementById("reiniciarMarcador");

    /* Objeto del juego */
    const TresEnRaya = {
        tablero: Array(9).fill(""),
        jugadorActual: "X",
        modo: "pvp",
        puntuacion: JSON.parse(localStorage.getItem("marcador")) || {
            pvp: { X: 0, O: 0, empate: 0 },
            aleatorio: { X: 0, O: 0, empate: 0 },
            minimax: { X: 0, O: 0, empate: 0 },
            alphabeta: { X: 0, O: 0, empate: 0 }
        },
        juegoTerminado: true,

        iniciar() {
            console.log("Iniciando juego");
            this.tablero = Array(9).fill("");
            this.jugadorActual = "X";
            this.juegoTerminado = false;
            this.renderizarTablero();
            this.toggleInputs(false);
            turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;
        },

        renderizarTablero() {
            console.log("Renderizando tablero", this.tablero);
            for (let i = 0; i < this.tablero.length; i++) {
                casillas[i].innerText = this.tablero[i];
            }
        },

        actualizarMarcador() {
            console.log("Modo de juego actual:", this.modo);
            if (!this.puntuacion[this.modo]) {
                console.error(`Modo de juego no válido: ${this.modo}`);
                return;
            }
            console.log("Actualizando marcador", this.puntuacion);
            puntajeX.innerText = this.puntuacion[this.modo].X;
            puntajeO.innerText = this.puntuacion[this.modo].O;
            puntajeEmpate.innerText = this.puntuacion[this.modo].empate || 0;
        },

        guardarPuntuacion() {
            console.log("Guardando puntuación", this.puntuacion);
            localStorage.setItem("marcador", JSON.stringify(this.puntuacion));
        },

        verificarGanador(tablero) {
            console.log("Verificando ganador", tablero);
            const combinacionesGanadoras = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const [a, b, c] of combinacionesGanadoras) {
                if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                    console.log("Ganador encontrado", tablero[a]);
                    casillas[a].classList.add("winning-cell");
                    casillas[b].classList.add("winning-cell");
                    casillas[c].classList.add("winning-cell");
                    return tablero[a];
                }
            }
            return null;
        },

        manejarClickCasilla(evento) {
            if (this.juegoTerminado) return;
            const indiceCasilla = evento.target.id.split("-")[1];
            if (this.tablero[indiceCasilla]) return;

            console.log("Casilla clickeada", indiceCasilla);
            this.tablero[indiceCasilla] = this.jugadorActual;
            this.renderizarTablero();

            const resultado = this.verificarGanador(this.tablero);
            if (resultado) {
                this.terminarJuego(resultado);
                return;
            }

            if (!this.tablero.includes("")) {
                this.terminarJuego("empate");
                return;
            }

            this.jugadorActual = this.jugadorActual === "X" ? "O" : "X";
            turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;

            if (this.modo !== "pvp" && this.jugadorActual === "O") {
                setTimeout(() => {
                    if (this.modo === "aleatorio") {
                        this.movimientoIAAleatorio();
                    } else if (this.modo === "minimax") {
                        this.movimientoIAMinimax();
                    } else if (this.modo === "alphaBeta") {
                        this.movimientoIAAlphaBeta();
                    }
                }, 500);
            }
        },

        toggleInputs(disable) {
            console.log("Toggling inputs", disable);
            document.getElementById("nombreJugador1").disabled = disable;
            document.getElementById("nombreJugador2").disabled = disable;
            seleccionModo.disabled = disable;
            botonIniciar.disabled = disable;
        },

        terminarJuego(resultado) {
            console.log("Terminando juego", resultado);
            this.juegoTerminado = true;
            this.toggleInputs(true);
            if (resultado === "empate") {
                this.puntuacion[this.modo].empate = (this.puntuacion[this.modo].empate || 0) + 1;
                setTimeout(() => alert("¡Empate!"), 100);
            } else {
                this.puntuacion[this.modo][resultado]++;
                setTimeout(() => alert(`¡${resultado} ha ganado!`), 100);
            }
            this.guardarPuntuacion();
            this.actualizarMarcador();
        },

        reiniciarJuego() {
            console.log("Reiniciando juego");
            this.iniciar();
        },

        reiniciarMarcador() {
            console.log("