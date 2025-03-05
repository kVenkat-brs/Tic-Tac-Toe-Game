const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");
const startBtn = document.querySelector("#startBtn");
const btnContainer = document.querySelector("#btnContainer");
const gameSection = document.querySelector("section");
const resetBtn = document.querySelector("#resetBtn");
const cells = document.querySelectorAll(".cell");

let playerChance = "x";
const WIN_POSSIBILITIES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  if (playerOneName.value.trim() === "") {
    alert("Enter the Name of Player One");
    playerOneName.focus();
  } else if (playerTwoName.value.trim() === "") {
    alert("Enter The Name of Player Two");
    playerTwoName.focus();
  } else {
    playerOneName.disabled = true;
    playerTwoName.disabled = true;
    btnContainer.style.display = "none";
    gameSection.classList.remove("d-none");
    clearBoard();
    addClickListeners();
    updateHoverEffect();
  }
}

function addClickListeners() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index), { once: true });
  });
}

function handleCellClick(cell, index) {
  if (cell.classList.contains("cellx") || cell.classList.contains("cellc")){
    
    return;
  }

  cell.classList.remove("x", "c"); // Removing hover effect
  cell.classList.add(playerChance === "x" ? "cellx" : "cellc"); // Assign actual move

  if (checkWinning()) {
    // setTimeout(() => alert(`${playerChance === "x" ? playerOneName.value : playerTwoName.value} wins!`), 100);
    alert(`${playerChance === "x" ? playerOneName.value : playerTwoName.value} wins!`)
    // setTimeout(resetGame, 500);
    resetGame();
    return;
  }

  if (checkDraw()) {
    // setTimeout(() => alert("Game is a Draw!"), 100);
    alert("Game is a Draw!")
    // setTimeout(resetGame, 500);
    resetGame();
    return;
  }

  playerChance = playerChance === "x" ? "c" : "x";
  updateHoverEffect();
}

function checkWinning() {
  return WIN_POSSIBILITIES.some(combination =>
    combination.every(index =>
      cells[index].classList.contains(playerChance === "x" ? "cellx" : "cellc")
    )
  );
}

function checkDraw() {
  return [...cells].every(cell => cell.classList.contains("cellx") || cell.classList.contains("cellc"));
}

function updateHoverEffect() {
  cells.forEach(cell => {
    if (!cell.classList.contains("cellx") && !cell.classList.contains("cellc")) {
      cell.classList.remove("x", "c");
      cell.classList.add(playerChance); // Adds 'x' or 'c' class
    }
  });
}

function clearBoard() {
  cells.forEach(cell => {
    cell.classList.remove("cellx", "cellc", "x", "c");
  });
  playerChance = "x";
}

function resetGame() {
  gameSection.classList.add("d-none");
  btnContainer.style.display = "block";
  playerOneName.disabled = false;
  playerTwoName.disabled = false;
  playerOneName.value = "";
  playerTwoName.value = "";
  playerOneName.focus();
  clearBoard();
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
