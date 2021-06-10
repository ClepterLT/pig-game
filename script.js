"use strict";

// SELECTING ELEMENTS
const player0DOM = document.querySelector(".player--0");
const player1DOM = document.querySelector(".player--1");

let score0DOM = document.querySelector("#score--0");
let score1DOM = document.querySelector("#score--1");

let currentScore0DOM = document.querySelector("#current--0");
let currentScore1DOM = document.querySelector("#current--1");

const diceDOM = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playingState;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;

  player0DOM.classList.remove("player--winner");
  player1DOM.classList.remove("player--winner");
  player0DOM.classList.add("player--active");
  player1DOM.classList.remove("player--active");
  diceDOM.classList.add("js-hidden");

  score0DOM.textContent = "0";
  score1DOM.textContent = "0";
  currentScore0DOM.textContent = "0";
  currentScore1DOM.textContent = "0";
};
init();

// FUNCTIONS
const switchToNextPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0DOM.classList.toggle("player--active");
  player1DOM.classList.toggle("player--active");
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener("click", function () {
  if (playingState) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceDOM.classList.remove("js-hidden");
    diceDOM.src = `dice-${dice}.png`;

    // 3. Check if rolled 1
    if (dice !== 1) {
      //   Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchToNextPlayer(activePlayer);
    }
  }
});

// HOLDING SCORE FUNCTIONALITY
btnHold.addEventListener("click", function () {
  if (playingState) {
    // 1. Add current score to Active Player's total score
    scores[activePlayer] += currentScore;

    //   2. Display new Active Player's total score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   3. Check if active player's score is >= 100
    if (scores[activePlayer] >= 20) {
      playingState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceDOM.classList.add("js-hidden");
    } else {
      // 4. set Default values and switch players
      switchToNextPlayer(activePlayer);
    }
  }
});

// NEW GAME FUNCTIONALITY
btnNew.addEventListener("click", init);
