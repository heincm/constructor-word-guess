const Word = require('./Word');
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log

let wordBank = ['chainring', 'sprocket', 'clips', 'saddle', 'handlebars', 'drafting', 'endo', 'fixie',
  'derailleur', 'crankarm', 'frame', 'helmet', 'peloton', 'presta', 'roadie', 'schrader', 'spokes',
  'stem', 'tubeless', 'wheelie', 'flat', 'aero',]

let remainingGuesses;
let correctGuesses;
let allGuesses;
let remainingLetters;
let currentWord;

function checkRound() {
  if (remainingLetters === 0) {
    for (let e = 0; e < correctGuesses.length; e++) {
      currentWord.checkLetter(correctGuesses[e]);
    };
    currentWord.returnString();
    wordBank.splice(wordBank.indexOf(currentWord.guessWord));
    log(chalk.green.bold("WINNER! \nWINNER! \nWINNER!"));
    startGame();
  } else if (remainingGuesses === 0) {
    log(chalk.red("Too many wrong guesses ") + chalk.red.bold.inverse("GAME OVER!"));
    startGame();
  } else {
    playRound();
  }
};

function startGame() {
  inquirer.prompt([
    {
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ["New Game", "Exit"]
    }
  ])
    .then(answers => {
      if (answers.start === "New Game") {
        newRound();
      } else {
        process.exit();
      }
    });
};

function newRound() {
  currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
  remainingGuesses = 10;
  correctGuesses = [];
  allGuesses = [];
  remainingLetters = currentWord.guessWord.length;
  playRound();
};

function playRound() {
  if (correctGuesses.length > 0) {
    for (let q = 0; q < correctGuesses.length; q++) {
      currentWord.checkLetter(correctGuesses[q]);
    };
  }
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
      if (!isNaN(answers.q1)) {
        log(chalk.yellow("No numbers, bro!"));
        playRound();
        return;
      }
      if (!allGuesses.includes(answers.q1)) {
        if (currentWord.guessWord.includes(answers.q1)) {
          correctGuesses.push(answers.q1);
          log(chalk.green("Correct-a-mundo, broski!"));
          for (let n = 0; n < currentWord.guessWord.length; n++) {
            if (answers.q1 === currentWord.guessWord[n]) {
              remainingLetters--;
            };
          };
        } else {
          remainingGuesses--;
          if (remainingGuesses > 0) {
            log(chalk.red("Wrong answer, bruh! Try again! Remaining Guesses:", remainingGuesses));
          }
        }
        allGuesses.push(answers.q1);
      } else {
        log(chalk.blue("You already guessed that letter, brosef. Guess another letter."));
      }
      checkRound();
    });
};

startGame();