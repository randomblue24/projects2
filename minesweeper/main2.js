const size = 4;
const mineCount = 3;
let board = [];
let revealed = [];
let gameOver = false;

// Initialize the board and place mines
function initializeBoard() {
  board = Array(size).fill().map(() => Array(size).fill('.'));
  revealed = Array(size).fill().map(() => Array(size).fill(false));

  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (board[row][col] !== 'M') {
      board[row][col] = 'M';
      minesPlaced++;
    }
  }

  // Calculate numbers
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== 'M') {
        board[i][j] = countMines(i, j);
      }
    }
  }
}

function countMines(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        if (board[newRow][newCol] === 'M') {
          count++;
        }
      }
    }
  }
  return count;
}

function displayBoard() {
  console.log('  0 1 2 3');
  for (let i = 0; i < size; i++) {
    let row = `${i} `;
    for (let j = 0; j < size; j++) {
      if (revealed[i][j]) {
        row += `${board[i][j]} `;
      } else {
        row += '. ';
      }
    }
    console.log(row);
  }
}

function revealCell(row, col) {
  if (row < 0 || row >= size || col < 0 || col >= size || revealed[row][col] || gameOver) {
    return;
  }
  revealed[row][col] = true;
  if (board[row][col] === 'M') {
    gameOver = true;
    console.log('Game Over! You hit a mine.');
    displayFullBoard();
    return;
  }
  if (board[row][col] === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        revealCell(row + i, col + j);
      }
    }
  }
}

function displayFullBoard() {
  revealed = Array(size).fill().map(() => Array(size).fill(true));
  displayBoard();
}

function simulateGame() {
  initializeBoard();
  displayBoard();
  
  // Simulate automatic revealing of cells
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!revealed[i][j]) {
        revealCell(i, j);
      }
      if (gameOver) return;
    }
  }

  if (checkWin()) {
    console.log('Congratulations! You won.');
    displayFullBoard();
  } else {
    console.log('Game over! You lost.');
    displayFullBoard();
  }
}

function checkWin() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!revealed[i][j] && board[i][j] !== 'M') {
        return false;
      }
    }
  }
  return true;
}

// Run the simulation
simulateGame();
