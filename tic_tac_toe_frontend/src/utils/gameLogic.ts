export const checkWinner = (board: string[][]): string | null => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  }

  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }

  // Check for draw
  if (board.every(row => row.every(cell => cell !== ''))) {
    return 'draw';
  }

  return null;
};

export const getAIMove = (board: string[][]): { row: number; col: number } => {
  // Simple AI: Find first empty cell
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return { row: i, col: j };
      }
    }
  }
  return { row: 0, col: 0 }; // Fallback (should never happen)
};
