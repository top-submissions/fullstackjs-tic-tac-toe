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

