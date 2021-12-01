import { rollDice, currentDice } from './dice.js';

const rollBtn = document.getElementById('roll-button');
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const player1SpanEl = document.querySelector('.player-1 span');
const player2SpanEl = document.querySelector('.player-2 span');
const player1TotalEl = player1El.querySelector('.total strong');
const player2TotalEl = player2El.querySelector('.total strong');
const tempTotal1 = player1El.querySelector('.temp-number');
const tempTotal2 = player2El.querySelector('.temp-number');
const getNumbersEl = document.getElementById('get-button');

let activePlayer = 1;
let waitingNumbers = 0;
let total = 0;
const winScore = 10;
const audio = new Audio('./bell.wav');

function incWaiting(dice) {
  waitingNumbers += dice;

  tempTotal1.textContent = 0;
  tempTotal2.textContent = 0;

  if (activePlayer === 1) tempTotal1.textContent = waitingNumbers;
  if (activePlayer === 2) tempTotal2.textContent = waitingNumbers;
}

function addNumbers() {
  total = waitingNumbers;

  if (activePlayer === 1)
    player1TotalEl.textContent = Number(player1TotalEl.textContent) + total;
  if (activePlayer === 2)
    player2TotalEl.textContent = Number(player2TotalEl.textContent) + total;

  isWinner();
  changePlayer();
}

function isWinner() {
  const total =
    activePlayer === 1
      ? +player1TotalEl.textContent
      : +player2TotalEl.textContent;

  if (total >= winScore) {
    alert(`Player ${activePlayer} is winner `);
    window.location.reload();
  }
}

function changePlayer() {
  audio.play();

  waitingNumbers = 0;
  activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
  player1SpanEl.classList.toggle('active');
  player2SpanEl.classList.toggle('active');

  tempTotal1.textContent = 0;
  tempTotal2.textContent = 0;
}

rollBtn.addEventListener('click', () => {
  //dice rolling
  rollDice();
  //if currentDice is 1
  if (currentDice === 1) {
    setTimeout(() => {
      incWaiting(0);
      changePlayer();
    }, 1500);

    return;
  }
  //increase numbers
  setTimeout(() => incWaiting(currentDice), 1000);
});

getNumbersEl.addEventListener('click', addNumbers);
