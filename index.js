const Word = require('./Word');
const inquirer = require('inquirer');
const chalk = require('chalk');

let wordBank = ['chainring', 'sprocket', 'clips', 'saddle', 'handlebars', 'drafting', 'endo', 'fixie',
  'derailleur', 'crankarm', 'frame', 'helmet', 'peloton', 'presta', 'roadie', 'schrader', 'spokes',
  'stem', 'tubeless', 'wheelie', 'flat', 'aero',]

let randNum = Math.floor(Math.random() * wordBank.length) + 1;
let remainingGuesses = 10;
let correctGuesses = [];
let allGuesses = [];
let remainingLetters;

function checkRound() {
  if (remainingLetters === 0){
    console.log("Winner!")
    process.exit();
  }
  if (remainingGuesses === 0) {
    console.log(chalk.red.bold.inverse("game over"))
  } else {
    playRound();
  }
};



function playRound() { debugger;
  let currentWord = new Word(wordBank[randNum])
  remainingLetters = currentWord.guessWord.length

  for (let q = 0; q < correctGuesses.length; q++) {
    currentWord.checkLetter(correctGuesses[q]);
  };

  currentWord.returnString();

  inquirer
    .prompt([
      {
        name: "q1",
        type: "input",
        message: "Choose a letter"
      }
    ])
    .then(answers => {
      if (!allGuesses.includes(answers.q1)) {
        if (currentWord.guessWord.includes(answers.q1)) {
          correctGuesses.push(answers.q1);
          console.log(chalk.green("Correct-a-mundo, broski!"));
          console.log("remaining letters", remainingLetters);
          remainingLetters--;
        } else {
          remainingGuesses--;
          if (remainingGuesses > 0) {
            console.log(chalk.red("Wrong answer, bruh! Try again! Remaining Guesses: ", remainingGuesses))
          } else {
            console.log(chalk.red("Too many wrong guesses"))
          }
        }
        allGuesses.push(answers.q1);
      } else {
        console.log(chalk.blue("You already guessed that letter. Guess another letter"));
      }
      checkRound();
    });
}

checkRound();