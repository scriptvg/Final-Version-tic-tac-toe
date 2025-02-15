document.addEventListener("DOMContentLoaded", () => {
    const casillas = document.querySelectorAll(".casilla");
    const botonReiniciar = document.getElementById("reiniciar");
    const botonIniciar = document.getElementById("iniciarJuego");
    const seleccionModo = document.getElementById("modoJuego");
    const puntajeX = document.getElementById("marcadorX");
    const puntajeO = document.getElementById("marcadorO");
    const puntajeEmpate = document.getElementById("empate");

    const TresEnRaya = {
        tablero: Array(9).fill(""),
        jugadorActual: "X",
        modo: "pvp",
        puntuacion: JSON.parse(localStorage.getItem("marcador")) || {
            pvp: { X: 0, O: 0, empate: 0 },
            aleatorio: { X: 0, O: 0, empate: 0 },
            minimax: { X: 0, O: 0, empate: 0 }
        },
        juegoTerminado: false,

        iniciar() {
            this.tablero = Array(9).fill("");
            this.jugadorActual = "X";
            this.juegoTerminado = false;
            this.renderizarTablero();
        },

        renderizarTablero() {
            for (let i = 0; i < this.tablero.length; i++) {
                casillas[i].innerText = this.tablero[i];
            }
        },

        actualizarMarcador() {
            puntajeX.innerText = this.puntuacion[this.modo].X;
            puntajeO.innerText = this.puntuacion[this.modo].O;
            puntajeEmpate.innerText = this.puntuacion[this.modo].empate || 0;
        },

        guardarPuntuacion() {
            localStorage.setItem("marcador", JSON.stringify(this.puntuacion));
        },

        verificarGanador(tablero) {
            const combinacionesGanadoras = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const [a, b, c] of combinacionesGanadoras) {
                if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                    return tablero[a];
                }
            }
            return null;
        },

        manejarClickCasilla(evento) {
            const indiceCasilla = evento.target.id.split("-")[1];
            if (this.tablero[indiceCasilla] || this.juegoTerminado) return;

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

            if (!this.juegoTerminado && this.modo !== "pvp" && this.jugadorActual === "O") {
                setTimeout(() => {
                    this.modo === "aleatorio" ? this.movimientoIAAleatorio() : this.movimientoIAMinimax();
                }, 500);
            }
        },

        movimientoIAAleatorio() {
            const movimientosDisponibles = this.tablero
                .map((casilla, indice) => (casilla === "" ? indice : null))
                .filter(indice => indice !== null);
            const indiceAleatorio = movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)];
            this.manejarClickCasilla({ target: casillas[indiceAleatorio] });
        },

        movimientoIAMinimax() {
            const mejorMovimiento = this.minimax(this.tablero.slice(), "O");
            if (mejorMovimiento.indice !== undefined) {
                this.manejarClickCasilla({ target: casillas[mejorMovimiento.indice] });
            }
        },

        minimax(nuevoTablero, jugador) {
            const ganador = this.verificarGanador(nuevoTablero);
            if (ganador === "O") return { puntuacion: 10 };
            if (ganador === "X") return { puntuacion: -10 };
            if (!nuevoTablero.includes("")) return { puntuacion: 0 };

            const movimientosDisponibles = nuevoTablero
                .map((casilla, indice) => (casilla === "" ? indice : null))
                .filter(indice => indice !== null);

            const movimientos = movimientosDisponibles.map(indice => {
                const movimiento = { indice };
                nuevoTablero[indice] = jugador;
                movimiento.puntuacion = this.minimax(nuevoTablero, jugador === "O" ? "X" : "O").puntuacion;
                nuevoTablero[indice] = "";
                return movimiento;
            });

            if (jugador === "O") {
                return movimientos.reduce((mejor, movimiento) => movimiento.puntuacion > mejor.puntuacion ? movimiento : mejor, { puntuacion: -Infinity });
            } else {
                return movimientos.reduce((mejor, movimiento) => movimiento.puntuacion < mejor.puntuacion ? movimiento : mejor, { puntuacion: Infinity });
            }
        },

        terminarJuego(resultado) {
            this.juegoTerminado = true;
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
            this.iniciar();
        },

        asignarEventos() {
            casillas.forEach(casilla => {
                casilla.addEventListener("click", this.manejarClickCasilla.bind(this));
            });

            botonReiniciar.addEventListener("click", () => this.reiniciarJuego());

            botonIniciar.addEventListener("click", () => {
                this.modo = seleccionModo.value;
                this.actualizarMarcador();
                this.reiniciarJuego();
            });
        }
    };

    TresEnRaya.asignarEventos();
    TresEnRaya.iniciar();
    TresEnRaya.actualizarMarcador();
});