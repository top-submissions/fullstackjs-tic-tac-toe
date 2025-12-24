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

