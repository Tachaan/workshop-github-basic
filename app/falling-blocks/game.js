const ROWS = 16;
const COLS = 10;
const SHAPE = [
  [1, 1],
  [1, 1],
];

// Workshop bug: this should point to the last row of the board.
const FLOOR_ROW = Number.POSITIVE_INFINITY;

const board = document.querySelector("#board");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

let piece;
let lockedCells;
let tickId;

function resetGame() {
  piece = { row: 0, col: 4 };
  lockedCells = new Set();
  status.classList.remove("warning");
  clearInterval(tickId);
  render();
  tickId = setInterval(tick, 350);
}

function cellKey(row, col) {
  return `${row}:${col}`;
}

function isAtBottom() {
  const bottomOfPiece = piece.row + SHAPE.length - 1;
  return bottomOfPiece >= FLOOR_ROW;
}

function lockPiece() {
  SHAPE.forEach((shapeRow, rowOffset) => {
    shapeRow.forEach((filled, colOffset) => {
      if (!filled) return;
      const row = piece.row + rowOffset;
      const col = piece.col + colOffset;
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        lockedCells.add(cellKey(row, col));
      }
    });
  });

  clearInterval(tickId);
  status.classList.remove("warning");
  status.textContent = "Fixed! ブロックが底で止まりました。";
  render();
}

function tick() {
  if (isAtBottom()) {
    lockPiece();
    return;
  }

  piece.row += 1;
  render();

  if (piece.row > ROWS) {
    status.classList.add("warning");
    status.textContent = `Bug: 底を検出できず、盤面の外を落下中です。y=${piece.row}`;
  } else {
    status.classList.remove("warning");
    status.textContent = `Falling... y=${piece.row}`;
  }
}

function isActiveCell(row, col) {
  return SHAPE.some((shapeRow, rowOffset) =>
    shapeRow.some((filled, colOffset) =>
      filled && row === piece.row + rowOffset && col === piece.col + colOffset
    )
  );
}

function render() {
  board.innerHTML = "";

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (lockedCells.has(cellKey(row, col))) {
        cell.classList.add("locked");
      }

      if (isActiveCell(row, col)) {
        cell.classList.add("active");
      }

      board.appendChild(cell);
    }
  }
}

resetButton.addEventListener("click", resetGame);
resetGame();
