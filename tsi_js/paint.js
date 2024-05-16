//importing promptsync to handle user input output
const prompt = require("prompt-sync")();

//function to get paint price
function getPaint(text){
    let white=20;
    let black=25;
    let blue=30;
    let red=35;
    let green=40;
  
    //using switch case to return correct price
    switch (text) {
        case "white":
            return white;
        case "blue":
            return blue;
        case "green":
            return green;
        case "red":
            return red;
        case "black":
            return black;
        default:
            return;
    }
}

function getInput() {
    //note, input is a function in js
    let input = prompt("Enter a number:");
    return input;
}

console.log(getInput());


