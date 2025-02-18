# Tic-Tac-Toe con Inteligencia Artificial

## Descripción
Este es un juego de Tic-Tac-Toe (Tres en Raya) implementado en HTML, CSS y JavaScript. Cuenta con diferentes modos de juego, incluyendo jugador vs jugador y jugador vs IA, con algoritmos de inteligencia artificial como Minimax y Alpha-Beta para tomar decisiones en el juego.

## Características Principales
- **Modo PvP (Jugador vs Jugador)**: Dos jugadores humanos pueden turnarse para jugar.
- **Modo IA Aleatorio**: La IA realiza movimientos al azar.
- **Modo IA Minimax**: Implementa el algoritmo Minimax para tomar decisiones óptimas.
- **Modo IA Alpha-Beta**: Utiliza poda Alpha-Beta para mejorar la eficiencia del algoritmo Minimax.
- **Sistema de Marcador**: Se almacena el puntaje de cada modo de juego en el LocalStorage.
- **Interfaz Moderna**: Estilizada con CSS para una apariencia atractiva.

## Estructura del Proyecto
```
TicTacToe/
│-- index.html      # Estructura del juego y la interfaz
│-- src/
│   ├── css/
│   │   ├── style.css     # Estilos del juego
│   ├── js/
│   │   ├── main.js       # Lógica del juego
```

## Archivos
### index.html
Contiene la estructura principal del juego, incluyendo:
- Contenedor del tablero.
- Entradas para nombres de jugadores.
- Selector de modo de juego.
- Botones para iniciar y reiniciar el juego.
- Marcador de puntuación.

### style.css
Define la apariencia del juego, con:
- Diseño basado en Neumorfismo.
- Animaciones y transiciones suaves.
- Diseño adaptable a distintos tamaños de pantalla.

### main.js
Contiene la lógica del juego, incluyendo:
- Gestión de turnos y eventos de clic.
- Verificación de combinaciones ganadoras.
- Implementación de los algoritmos Minimax y Alpha-Beta.
- Actualización del marcador y almacenamiento en LocalStorage.

## Instrucciones de Uso
1. Abrir `index.html` en un navegador.
2. Ingresar los nombres de los jugadores (opcional).
3. Seleccionar el modo de juego.
4. Presionar el botón "Play" para iniciar.
5. Hacer clic en las casillas para jugar.
6. El marcador se actualiza automáticamente.
7. Para reiniciar el juego, usar el botón correspondiente.

## Tecnologías Utilizadas
- **HTML5**: Estructura del juego.
- **CSS3**: Estilización y animaciones.
- **JavaScript (ES6+)**: Lógica del juego y manipulación del DOM.

## Mejoras Futuras
- Implementar un sistema de ranking basado en partidas ganadas.
- Añadir más animaciones y efectos visuales.
- Mejorar la IA con técnicas más avanzadas.
- Hacerlo compatible con dispositivos móviles.

## Autor
Desarrollado por Allan José Vélez González.

