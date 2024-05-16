//importing promptsync to handle user input output
const prompt = require("prompt-sync")();

//function to get paint price
function paintPrice(text){
    const white=20;
    const black=25;
    const blue=30;
    const red=35;
    const green=40;
  
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

function getPaint() {
    //note, input is a function in js
    let input = prompt("What color paint do you want, red, green, blue, white or black? ");

    /*while (input!=="red" &&  input!=="green" && input!=="blue" && input!=="white" && input!=="black") {
        input=prompt("Invalid choice, please enter red, green, blue, white or black: ".toLowerCase());
    } */
    if(input!=="red"){
        input=prompt("Invalid choice,: ".toLowerCase());
    }
    

    return input;

}


function customerChoice(){
    let color= getPaint();
    let price= paintPrice(color);

    console.log("You've chosen: " + color + "which costs: $" + price);

}

customerChoice();


