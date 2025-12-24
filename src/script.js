// Gameboard Module
const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const makeMove = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const isBoardFull = () => {
    return board.every((cell) => cell !== "");
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          winningCombo: combo,
        };
      }
    }

    return null;
  };

  return {
    getBoard,
    resetBoard,
    makeMove,
    isBoardFull,
    checkWinner,
  };
})();

// Player Factory Function
const createPlayer = (name, marker, initialScore = 0) => {
  let score = initialScore;
  let playerName = name;

  const getName = () => playerName;
  const getMarker = () => marker;
  const getScore = () => score;
  const incrementScore = () => score++;

  const resetScore = () => {
    score = 0;
  };

  const setName = (newName) => {
    playerName = newName;
  };

  return {
    getName,
    getMarker,
    getScore,
    incrementScore,
    resetScore,
    setName,
  };
};

// Game Controller Module
const GameController = (function () {
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  let gameActive = false;
  let tieScore = 0;

  const startGame = (name1, name2) => {
    // Only update names if they've changed
    if (name1 && name1 !== player1.getName()) {
      player1.setName(name1);
    }

    if (name2 && name2 !== player2.getName()) {
      player2.setName(name2);
    }

    GameBoard.resetBoard();
    currentPlayer = player1;
    gameActive = true;

    DisplayController.updateGameInfo();
    DisplayController.renderBoard();
    DisplayController.clearWinningCells();
    DisplayController.updateScoreboard();
    DisplayController.showMessage(
      `Game started! ${currentPlayer.getName()} (${currentPlayer.getMarker()}) goes first.`
    );
  };

  const restartGame = () => {
    GameBoard.resetBoard();
    currentPlayer = player1;
    gameActive = true;

    DisplayController.updateGameInfo();
    DisplayController.renderBoard();
    DisplayController.clearWinningCells();
    DisplayController.showMessage(
      `Game restarted! ${currentPlayer.getName()} (${currentPlayer.getMarker()}) goes first.`
    );
  };

  const resetScores = () => {
    player1.resetScore();
    player2.resetScore();
    tieScore = 0;
    DisplayController.updateScoreboard();
  };

  const playTurn = (cellIndex) => {
    if (!gameActive) return false;

    if (GameBoard.makeMove(cellIndex, currentPlayer.getMarker())) {
      DisplayController.renderBoard();

      const winner = GameBoard.checkWinner();
      if (winner) {
        gameActive = false;
        if (winner.winner === "X") {
          player1.incrementScore();
        } else {
          player2.incrementScore();
        }
        DisplayController.updateScoreboard();
        DisplayController.highlightWinningCells(winner.winningCombo);
        DisplayController.showMessage(`🎉 ${currentPlayer.getName()} wins! 🎉`);
        return true;
      }

      if (GameBoard.isBoardFull()) {
        gameActive = false;
        tieScore++;
        DisplayController.updateScoreboard();
        DisplayController.showMessage("It's a tie! 🤝");
        return true;
      }

      // Switch players
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      DisplayController.updateGameInfo();
      DisplayController.showMessage(
        `${currentPlayer.getName()}'s turn (${currentPlayer.getMarker()})`
      );
      return true;
    }

    return false;
  };

  const isGameActive = () => gameActive;

  const getCurrentPlayer = () => currentPlayer;

  const getPlayers = () => ({
    player1: {
      name: player1.getName(),
      score: player1.getScore(),
      marker: player1.getMarker(),
    },
    player2: {
      name: player2.getName(),
      score: player2.getScore(),
      marker: player2.getMarker(),
    },
    tieScore,
  });

  return {
    startGame,
    restartGame,
    resetScores,
    playTurn,
    isGameActive,
    getCurrentPlayer,
    getPlayers,
  };
})();

// Display Controller Module
const DisplayController = (function () {
  const gameBoardElement = document.getElementById("gameBoard");
  const currentPlayerElement = document.getElementById("currentPlayer");
  const gameStatusElement = document.getElementById("gameStatus");
  const messageElement = document.getElementById("message");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const resetScoresBtn = document.getElementById("resetScoresBtn");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");

  // Scoreboard elements
  const player1NameElement = document.getElementById("player1Name");
  const player1ScoreElement = document.getElementById("player1Score");
  const player2NameElement = document.getElementById("player2Name");
  const player2ScoreElement = document.getElementById("player2Score");
  const tieScoreElement = document.getElementById("tieScore");

  const init = () => {
    renderBoard();
    updateGameInfo();
    updateScoreboard();
    attachEventListeners();
  };

  const renderBoard = () => {
    gameBoardElement.innerHTML = "";
    const board = GameBoard.getBoard();

    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.className = `cell ${cell.toLowerCase()}`;
      cellElement.dataset.index = index;
      cellElement.textContent = cell;

      cellElement.addEventListener("click", () => {
        if (GameController.isGameActive()) {
          if (GameController.playTurn(index)) {
            updateGameInfo();
          }
        }
      });

      gameBoardElement.appendChild(cellElement);
    });
  };

  const updateGameInfo = () => {
    const currentPlayer = GameController.getCurrentPlayer();
    const players = GameController.getPlayers();

    currentPlayerElement.textContent = `${currentPlayer.getName()} (${currentPlayer.getMarker()})`;
    currentPlayerElement.style.color =
      currentPlayer.getMarker() === "X" ? "#f44336" : "#2196F3";

    if (GameController.isGameActive()) {
      gameStatusElement.textContent = "Game in progress";
      gameStatusElement.style.color = "#4CAF50";
    } else {
      gameStatusElement.textContent = "Game over";
      gameStatusElement.style.color = "#f44336";
    }

    // Always enable restart button
    restartBtn.disabled = false;
    restartBtn.title = "Start new game (keeps scores)";

    // Update input fields with current player names
    player1Input.value = players.player1.name;
    player2Input.value = players.player2.name;
  };

  const updateScoreboard = () => {
    const players = GameController.getPlayers();

    player1NameElement.textContent = players.player1.name;
    player1ScoreElement.textContent = players.player1.score;

    player2NameElement.textContent = players.player2.name;
    player2ScoreElement.textContent = players.player2.score;

    tieScoreElement.textContent = players.tieScore;
  };

  const highlightWinningCells = (winningCombo) => {
    winningCombo.forEach((index) => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      if (cell) {
        cell.classList.add("winning");
      }
    });
  };

  const clearWinningCells = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("winning");
    });
  };

  const showMessage = (text) => {
    messageElement.textContent = text;
    messageElement.classList.add("show");

    setTimeout(() => {
      messageElement.classList.remove("show");
    }, 3000);
  };

  const attachEventListeners = () => {
    startBtn.addEventListener("click", () => {
      const name1 = player1Input.value.trim() || "Player 1";
      const name2 = player2Input.value.trim() || "Player 2";
      GameController.startGame(name1, name2);
    });

    restartBtn.addEventListener("click", () => {
      GameController.restartGame();
    });

    resetScoresBtn.addEventListener("click", () => {
      GameController.resetScores();
      showMessage("Scores have been reset!");
    });

    // Allow pressing Enter to start game
    player1Input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") startBtn.click();
    });

    player2Input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") startBtn.click();
    });
  };

  return {
    init,
    renderBoard,
    updateGameInfo,
    updateScoreboard,
    highlightWinningCells,
    clearWinningCells,
    showMessage,
  };
})();

// Initialize game on page load
document.addEventListener("DOMContentLoaded", () => {
  DisplayController.init();

  // Initial welcome message
  setTimeout(() => {
    DisplayController.showMessage(
      'Welcome to Tic Tac Toe! Enter player names and click "Start Game".'
    );
  }, 500);
});
