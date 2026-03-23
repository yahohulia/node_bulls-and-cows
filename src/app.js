/* eslint-disable no-console */
'use strict';

const { createInterface } = require('node:readline');
const { generateRandomNumber } = require('./modules/generateRandomNumber');
const { checkIsValidUserInput } = require('./modules/checkIsValidUserInput');
const { getBullsAndCows } = require('./modules/getBullsAndCows');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numToGuess = generateRandomNumber();

console.log(
  "Let's play a game. \n I guess the 4-digit number, and you have to guess it.",
);

function playTurn() {
  rl.question('Enter your guess: ', (answer) => {
    if (!checkIsValidUserInput(answer)) {
      if (answer[0] === '0') {
        console.log('Input must not start with "0"');

        return playTurn();
      }

      if (!answer || answer.length !== 4) {
        console.log('Input length must be 4.\n');

        return playTurn();
      }

      if (isNaN(answer)) {
        console.log('Input must be a number.\n');

        return playTurn();
      }

      const uniqueChars = new Set(answer.toString());

      if (uniqueChars.size !== 4) {
        console.log('Each number must be unique.\n');

        return playTurn();
      }

      return playTurn();
    }

    if (String(answer) === String(numToGuess)) {
      console.log('\nYou win!\n ');

      rl.close();

      return;
    }

    const result = getBullsAndCows(answer, numToGuess);

    console.log(result);

    playTurn();
  });
}

playTurn();
