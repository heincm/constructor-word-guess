const Word = require('./Word');
const inquirer = require('inquirer');
const chalk = require('chalk');

let wordBank = ['chainring', 'sprocket', 'clips', 'saddle', 'handlebars', 'drafting', 'endo', 'fixie',
  'derailleur', 'crankarm', 'frame', 'helmet', 'peloton', 'presta', 'roadie', 'schrader', 'spokes',
  'stem', 'tubeless', 'wheelie', 'flat', 'aero',]

let randNum = Math.floor(Math.random() * wordBank.length) + 1;
let remainingGuesses = 10;
remainingGuesses;
let correctGuesses = [];
let allGuesses = [];

function checkRound() {
  if (remainingGuesses = 0) {
    console.log("game over")
  }
  playRound();
};



function playRound() {
  let currentWord = new Word(wordBank[randNum])
  console.log(" ")
  console.log(currentWord.guessWord);
  console.log(" ")
    for (let q = 0; q < correctGuesses.length; q++) {
      currentWord.checkLetter(correctGuesses[q]);
    };
    currentWord.returnString();
    console.log(" ")
  inquirer
    .prompt([
      {
        name: "q1",
        type: "input",
        message: "Choose a letter"
      }
    ])
    .then(answers => {
      if (currentWord.guessWord.includes(answers.q1)) {
        correctGuesses.push(answers.q1);
        console.log(chalk.green("Correct-a-mundo, broski!"));
      } else {
        console.log(chalk.red("You wrong, bruh! Try again!"))
      }
      console.log(" ");
      checkRound();
    });
}

checkRound();