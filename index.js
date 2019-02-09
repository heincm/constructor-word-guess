const Word = require('./Word');
const inquirer = require('inquirer')

let wordBank = ['chainring', 'sprocket', 'clips', 'saddle', 'handlebars', 'drafting', 'endo', 'fixie',
  'derailleur', 'crankarm', 'frame', 'helmet', 'peloton', 'presta', 'roadie', 'schrader', 'spokes',
  'stem', 'tubeless', 'wheelie', 'flat', 'aero',]

let randNum = Math.floor(Math.random() * wordBank.length) + 1;
let remainingGuesses = 10;
remainingGuesses;

function checkRound() {
  if (remainingGuesses = 0) {
    console.log("game over")
  }
  playRound();
};


function playRound() {
  let currentWord = new Word(wordBank[randNum])
  console.log(currentWord); debugger;  
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
      debugger;
      currentWord.checkLetter(answers.q1)
      currentWord.returnString();
      checkRound();
    });
}

function displayLetters() {


}

checkRound();