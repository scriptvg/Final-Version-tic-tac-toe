document.addEventListener("DOMContentLoaded", () => {
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
            console.log("Reiniciando marcador");
            this.puntuacion = {
                pvp: { X: 0, O: 0, empate: 0 },
                aleatorio: { X: 0, O: 0, empate: 0 },
                minimax: { X: 0, O: 0, empate: 0 },
                alphaBeta: { X: 0, O: 0, empate: 0 }
            };
            this.guardarPuntuacion();
            this.actualizarMarcador();
        },

        asignarEventos() {
            console.log("Asignando eventos");
            casillas.forEach(casilla => {
                casilla.addEventListener("click", this.manejarClickCasilla.bind(this));
            });

            botonReiniciar.addEventListener("click", () => this.reiniciarJuego());

            botonIniciar.addEventListener("click", () => {
                this.modo = seleccionModo.value;
                console.log("Modo de juego seleccionado", this.modo);
                this.actualizarMarcador();
                this.iniciar();
            });

            botonReiniciarMarcador.addEventListener("click", () => this.reiniciarMarcador());
        },

        minimax(tablero, jugador) {
            const ganador = this.verificarGanador(tablero);
            if (ganador === "X") return { puntaje: 1 };
            if (ganador === "O") return { puntaje: -1 };
            if (!tablero.includes("")) return { puntaje: 0 };

            if (jugador === "X") {
            let mejorPuntaje = -Infinity;
            let mejorMovimiento = null;
            for (let i = 0; i < tablero.length; i++) {
                if (tablero[i] === "") {
                tablero[i] = "X";
                const resultado = this.minimax(tablero, "O");
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
            let mejorMovimiento = null;
            for (let i = 0; i < tablero.length; i++) {
                if (tablero[i] === "") {
                tablero[i] = "O";
                const resultado = this.minimax(tablero, "X");
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
            console.log("Ejecutando movimiento IA aleatorio");
            let indiceAleatorio;
            do {
                indiceAleatorio = Math.floor(Math.random() * this.tablero.length);
            } while (this.tablero[indiceAleatorio] !== "");

            console.log("Movimiento IA aleatorio seleccionado", indiceAleatorio);
            this.tablero[indiceAleatorio] = "O";
            this.renderizarTablero();
            casillas[indiceAleatorio].classList.add("rotate");
            setTimeout(() => {
                casillas[indiceAleatorio].classList.remove("rotate");
            }, 500);
            this.jugadorActual = "X";
            turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;
            this.manejarClickCasilla({ target: casillas[indiceAleatorio] });
        },

        movimientoIAMinimax() {
            console.log("Ejecutando movimiento IA minimax");
            const mejorMovimiento = this.minimax(this.tablero.slice(), "O");
            if (mejorMovimiento && mejorMovimiento.indice !== undefined) {
                console.log("Movimiento IA minimax seleccionado", mejorMovimiento.indice);
                this.tablero[mejorMovimiento.indice] = "O";
                this.renderizarTablero();
                casillas[mejorMovimiento.indice].classList.add("rotate");
                setTimeout(() => {
                    casillas[mejorMovimiento.indice].classList.remove("rotate");
                }, 500);
                // Verificar ganador o empate antes de cambiar turno
                const resultado = this.verificarGanador(this.tablero);
                if (resultado) {
                    this.terminarJuego(resultado);
                    return;
                }
                if (!this.tablero.includes("")) {
                    this.terminarJuego("empate");
                    return;
                }
                this.jugadorActual = "X";
                turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;
            }
        },

        movimientoIAAlphaBeta() {
            console.log("Ejecutando movimiento IA AlphaBeta");
            const mejorMovimiento = this.alphaBeta(this.tablero.slice(), "O", -Infinity, Infinity);
            if (mejorMovimiento.indice !== undefined) {
                console.log("Movimiento IA AlphaBeta seleccionado", mejorMovimiento.indice);
                const targetCell = casillas[mejorMovimiento.indice];
                this.tablero[mejorMovimiento.indice] = "O";
                this.renderizarTablero();
                targetCell.classList.add("rotate");
                setTimeout(() => {
                    targetCell.classList.remove("rotate");
                }, 500);
                this.jugadorActual = "X";
                turnIndicator.textContent = `Turno de: ${this.jugadorActual}`;
                this.manejarClickCasilla({ target: targetCell });
            }
        },

        alphaBeta(tablero, jugador, alpha, beta) {
            console.log("Ejecutando AlphaBeta", tablero, jugador, alpha, beta);
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
                        const resultado = this.alphaBeta(tablero, "X", alpha, beta);
                        tablero[i] = "";
                        if (resultado.puntaje > mejorPuntaje) {
                            mejorPuntaje = resultado.puntaje;
                            mejorMovimiento = { indice: i, puntaje: mejorPuntaje };
                        }
                        alpha = Math.max(alpha, resultado.puntaje);
                        if (beta <= alpha) {
                            break;
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
                        const resultado = this.alphaBeta(tablero, "O", alpha, beta);
                        tablero[i] = "";
                        if (resultado.puntaje < mejorPuntaje) {
                            mejorPuntaje = resultado.puntaje;
                            mejorMovimiento = { indice: i, puntaje: mejorPuntaje };
                        }
                        beta = Math.min(beta, resultado.puntaje);
                        if (beta <= alpha) {
                            break;
                        }
                    }
                }

                return mejorMovimiento;
            }
        }
    };

    console.log("Asignando eventos y actualizando marcador");
    TresEnRaya.asignarEventos();
    TresEnRaya.actualizarMarcador();
});