/* ---------- Griglia più estrazione ---------- */
const grid = document.querySelector(".grid");
const drawButton = document.getElementById("draw-button");
const drawnNumberDisplay = document.getElementById("drawn-number");

const totalCells = 99;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";

  if ((isRowEven && i % 2 === 0) || (!isRowEven && i % 2 !== 0)) {
    cell.classList.add("cell-dark");
  }

  cell.innerText = i;

  if (i % 9 === 0) isRowEven = !isRowEven;

  grid.appendChild(cell);
}

const drawnNumbers = new Set();

const drawNumber = function () {
  if (drawnNumbers.size >= totalCells) {
    document.getElementById("game-over-popup").classList.remove("hidden");
    return;
  }

  drawButton.disabled = true;
  const animationDuration = 2000;
  const animationInterval = 100;
  let elapsed = 0;

  const animation = setInterval(() => {
    drawnNumberDisplay.innerText = Math.floor(Math.random() * totalCells) + 1;
    elapsed += animationInterval;

    if (elapsed >= animationDuration) {
      clearInterval(animation);

      const remainingNumbers = [];
      for (let i = 1; i <= totalCells; i++) {
        if (!drawnNumbers.has(i)) remainingNumbers.push(i);
      }

      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      const finalNum = remainingNumbers[randomIndex];

      drawnNumbers.add(finalNum);
      drawnNumberDisplay.innerText = finalNum;

      document.querySelectorAll(".cell").forEach((cell) => {
        if (parseInt(cell.innerText) === finalNum) {
          cell.style.backgroundColor = "rgba(0, 128, 0, 0.4)";
        }
      });

      drawButton.disabled = false;

      if (drawnNumbers.size >= totalCells) {
        document.getElementById("game-over-popup").classList.remove("hidden");
      }
    }
  }, animationInterval);
};

drawButton.addEventListener("click", drawNumber);

/* ---------- Reset gioco ---------- */
const resetGame = function () {
  drawnNumbers.clear();
  drawnNumberDisplay.innerText = "--";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.backgroundColor = "";
  });
  drawButton.disabled = false;
  document.getElementById("game-over-popup").classList.add("hidden");
};

document.getElementById("restart-button").addEventListener("click", resetGame);