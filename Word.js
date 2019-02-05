const Letter = require('./Letter')

let Word = function (guessWord) {
    this.guessWord = guessWord;
    this.array = [];
    for (let i = 0; i < guessWord.length; i++) {
        this.array.push(new Letter(guessWord[i]));
    }
}

Word.prototype.returnString = function () { debugger;
    for (let g = 0; g < this.array.length; g++) {
        console.log(this.array[g].guessed());
    }

};

let hello = new Word("hello");
console.log(hello.array)
hello.returnString();
