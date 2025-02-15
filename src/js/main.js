document.addEventListener("DOMContentLoaded", () => {
    const casillas = document.querySelectorAll(".casilla");
    const botonReiniciar = document.getElementById("reiniciar");
    const botonIniciar = document.getElementById("iniciarJuego");
    const seleccionModo = document.getElementById("modoJuego");
    const puntajeX = document.getElementById("marcadorX");
    const puntajeO = document.getElementById("marcadorO");
    const puntajeEmpate = document.getElementById("empate");
    const turnIndicator = document.getElementById("turnIndicator");
    const gameOverlay = document.getElementById("gameOverlay");
    const botonReiniciarMarcador = document.getElementById("reiniciarMarcador");

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
            this.toggleInputs(false);
            turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;
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
            turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;

            if (!this.juegoTerminado && this.modo !== "pvp" && this.jugadorActual === "O") {
                setTimeout(() => {
                    this.modo === "aleatorio" ? this.movimientoIAAleatorio() : this.movimientoIAMinimax();
                }, 500);
            }
        },

        toggleInputs(disable) {
            document.getElementById("nombreJugador1").disabled = disable;
            document.getElementById("nombreJugador2").disabled = disable;
            seleccionModo.disabled = disable;
            botonIniciar.disabled = disable;
        },

        terminarJuego(resultado) {
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
            this.iniciar();
        },

        reiniciarMarcador() {
            this.puntuacion = {
                pvp: { X: 0, O: 0, empate: 0 },
                aleatorio: { X: 0, O: 0, empate: 0 },
                minimax: { X: 0, O: 0, empate: 0 }
            };
            this.guardarPuntuacion();
            this.actualizarMarcador();
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

            botonReiniciarMarcador.addEventListener("click", () => this.reiniciarMarcador());
        },

        minimax(tablero, jugador) {
            const resultado = this.verificarGanador(tablero);
            if (resultado) {
                if (resultado === "X") {
                    return { puntaje: -1 };
                } else if (resultado === "O") {
                    return { puntaje: 1 };
                } else {
                    return { puntaje: 0 };
                }
            }

            if (!tablero.includes("")) {
                return { puntaje: 0 };
            }

            if (jugador === "O") {
                let mejorPuntaje = -Infinity;
                let mejorMovimiento;

                for (let i = 0; i < tablero.length; i++) {
                    if (tablero[i] === "") {
                        tablero[i] = jugador;
                        const resultado = this.minimax(tablero, "X");
                        tablero[i] = "";
                        if (resultado.puntaje > mejorPuntaje) {
                            mejorPuntaje = resultado.puntaje;
                            mejorMovimiento = { indice: i, puntaje: mejorPuntaje };
                        }
                    }
                }

                return mejorMovimiento;
            } else {
                let mejorPuntaje = Infinity;
                let mejorMovimiento;

                for (let i = 0; i < tablero.length; i++) {
                    if (tablero[i] === "") {
                        tablero[i] = jugador;
                        const resultado = this.minimax(tablero, "O");
                        tablero[i] = "";
                        if (resultado.puntaje < mejorPuntaje) {
                            mejorPuntaje = resultado.puntaje;
                            mejorMovimiento = { indice: i, puntaje: mejorPuntaje };
                        }
                    }
                }

                return mejorMovimiento;
            }
        },

        movimientoIAAleatorio() {
            const indiceAleatorio = Math.floor(Math.random() * this.tablero.length);
            if (this.tablero[indiceAleatorio] === "") {
                this.tablero[indiceAleatorio] = "O";
                this.renderizarTablero();
                this.manejarClickCasilla({ target: casillas[indiceAleatorio] });
            } else {
                this.movimientoIAAleatorio();
            }
        },

        movimientoIAMinimax() {
            const mejorMovimiento = this.minimax(this.tablero.slice(), "O");
            if (mejorMovimiento.indice !== undefined) {
                const targetCell = casillas[mejorMovimiento.indice];
                this.manejarClickCasilla({ target: targetCell });
            }
        }
    };

    TresEnRaya.asignarEventos();
    TresEnRaya.iniciar();
    TresEnRaya.actualizarMarcador();
});