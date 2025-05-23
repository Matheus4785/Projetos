const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let timer = null;
let timeInSeconds = 0;
let isRunning = false;

// Atualiza o conteúdo do visor formatado como HH:MM:SS
function updateDisplay() {
  const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeInSeconds % 60).padStart(2, '0');
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Inicia o cronômetro
function startTimer() {
  if (isRunning) return;

  timer = setInterval(() => {
    timeInSeconds++;
    updateDisplay();
  }, 1000);

  isRunning = true;
}

// Pausa o cronômetro
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reseta o cronômetro
function resetTimer() {
  pauseTimer();
  timeInSeconds = 0;
  updateDisplay();
}

// Eventos de clique
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Exibe 00:00:00 no carregamento
updateDisplay();
