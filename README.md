# fullstackjs-tic-tac-toe

A browser-based **Tic Tac Toe** game built with vanilla JavaScript as part of  
**The Odin Project – JavaScript Course (Full Stack JavaScript Path)**.

This project focuses on organizing JavaScript code using **factory functions** and the **module pattern (IIFE)** while maintaining a clean separation between game logic and DOM manipulation.

---

## 🚀 Live Demo

👉 https://top-submissions.github.io/fullstackjs-tic-tac-toe/

---

## 🧠 About the Project

This is a two-player Tic Tac Toe game playable in the browser.  
Players can enter custom names, play multiple rounds, track wins and ties, restart games, and reset scores.

The project was built to practice:
- Modular JavaScript architecture
- Avoiding global variables
- Managing application state
- DOM interaction without frameworks

---

## ✨ Features

- Two-player Tic Tac Toe (X vs O)
- Custom player name input
- Win detection (rows, columns, diagonals)
- Tie detection
- Scoreboard tracking wins and ties
- Restart game without resetting scores
- Reset scores button
- Winning combination highlighting
- Responsive and modern UI
- GitHub Pages deployment

---

## 🛠 Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Factory Functions
- Module Pattern (IIFE)
- DOM Manipulation
- GitHub Pages

---

## 🎮 How to Play

1. Enter player names (optional).
2. Click **Start Game**.
3. Players take turns clicking empty cells.
4. First player to align three markers wins.
5. A tie is declared if the board fills with no winner.
6. Use **Restart Game** to play again.
7. Use **Reset Scores** to clear the scoreboard.

---

## 🧩 JavaScript Architecture

The game is organized into clear modules:

* **GameBoard Module**
  Manages the board state and win/tie detection.

* **Player Factory**
  Creates player objects with name, marker, and score.

* **GameController Module**
  Controls game flow, turn switching, scoring, and win logic.

* **DisplayController Module**
  Handles DOM rendering, UI updates, and user interaction.

This structure follows best practices taught in **The Odin Project**.

---

## 📚 What I Learned

* Structuring JavaScript projects using modules
* Separating logic from presentation
* Managing state without frameworks
* Writing maintainable, readable code
* Using GitHub Actions and GitHub Pages

---

## 🔮 Possible Improvements

* Single-player mode with AI
* Difficulty selection
* Persistent scores using `localStorage`
* Sound effects and animations
* Mobile-first UI refinements

---

## 👤 Author

**MatimotTheTimoters**
GitHub: [https://github.com/Chonky_Seal](https://github.com/Chonky_Seal)
