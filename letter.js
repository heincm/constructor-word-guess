let log = console.log

let Letter = function (string) { debugger;
    this.string = string;
    this.boolean = false;
    this.guessed = function () {
        if (this.boolean === true){
            return this.string;
        } else {
            return "_";
        }
    };
    this.takeCharacter = function(character) {
        if (character === this.string){
            this.boolean = true;
        }
    }
};
