let boxes = document.querySelectorAll(".buttons");
let reset = document.querySelector(".reset");
let turn0 = true;
let board = Array(9).fill("");

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell)) {
    return "Draw";
  }

  return null;
}

function handleClick(event, index) {
  if (board[index]) return; 

  board[index] = turn0 ? "X" : "O";
  event.target.innerText = board[index];
  event.target.style.fontSize = "40px";
  event.target.style.fontFamily = "Arial, sans-serif";

  const winner = checkWinner();
  if (winner) {
    setTimeout(() => {
      alert(winner === "Draw" ? "It's a draw!" : `${winner} wins!`);
      resetGame();
    }, 100);
  }

  turn0 = !turn0;
}

function resetGame() {
  board.fill("");
  boxes.forEach(box => {
    box.innerText = "";
  });
  turn0 = true;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", (event) => handleClick(event, index));
});

reset.addEventListener("click", resetGame);
