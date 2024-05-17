//importing promptsync to handle user input output
const prompt = require("prompt-sync")();

//function to get paint price
function paintPrice(text){
    const white=20;
    const black=25;
    const blue=30;
    const red=35;
    const green=40;

    let regularPaint = {white: 20, black: 25,blue: 30,red: 35,green: 40 };
    let premiumPaint= {white: 25, black: 30, blue: 35,red: 40,green: 45 };

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
    console.log("Regular: White: $20 /liter, \nBlack: $25 /liter \nBlue: $30 /liter \nRed: $35 /liter \nGreen: $40 /liter");
    console.log("Premium: White: $25 /liter, \nBlack: $30 /liter \nBlue: $35 /liter \nRed: $40 /liter \nGreen: $45 /liter");
    
    let input = prompt("Please choose Regular or Premium Paint: ").toLowerCase();

    //while loop to ensure correct input and stop users from entering invalid inputs
    while (input!=="regular" &&  input!=="premium") {
        input=prompt("Invalid choice, Please choose again: ".toLowerCase());
    }

    input = prompt("Please choose paint color: ").toLowerCase();
    //while loop to ensure correct input and stop users from entering invalid inputs
    while (input!=="red" &&  input!=="green" && input!=="blue" && input!=="white" && input!=="black") {
        input=prompt("Invalid choice, Please choose again: ".toLowerCase());
    }
    
    return input;

}

//Let the user provide how many walls and measurements of said walls
function getarea(){
    let walls=0;
    while(walls==0){
        walls=prompt("How many walls do you need? ");
        if(walls==0){
            console.log("Please enter a number greater than 0");
        }
    }
    let typeofwall;
    let total_squareft=0;
    let base=0;
    let height=0;

    for (let i=0; i<walls; i++){
        typeofwall=prompt("What type of wall is it: Rectangle, Triangle: ");
        typeofwall=typeofwall.toLowerCase();
        switch (typeofwall) {
            case "rectangle":
                base=prompt("Measurement of base wall: ");
                height=prompt("Height of wall: ");
                total_squareft=total_squareft+(base*height);

                break;
            
            case "triangle":
                width=prompt("Width of base of wall: ");
                height=prompt("Height of wall: ");
                total_squareft=total_squareft+((width*height)/2);

                break;
        }
    }
    return total_squareft;
}
//function to get the price and liters of paint needed
function paintAmount(priceperliter, measurement){
    //1 liter = 100 square feet
    let liter_cover=100;
        
    //total number of liters = total fquare foot / 100 square feet per liter. We round up using math.ceil
    let total_liters=Math.ceil(measurement/liter_cover);

    let total_price = total_liters * priceperliter;

    if(measurement<100){
        total_liters=1;
        total_price = priceperliter;
    }

    //can't return two values at once, 
    //so we need to return it as a object, whill will be tricky to work with
    return {
        total_price:total_price, total_liters:total_liters 
    }
}


function customerChoice(color, price){

    //this capitalizes the first letter of the color. 
    //Takes 1st char of string and capitalizes it. 
    //slice(1) removes the original 1st char of string using slice(1) 
    //we add the capizalized char to the string and concatenate them
    console.log("You've chosen: " + color.charAt(0).toUpperCase()+ color.slice(1)+ " $" + price + " /liter"
    );
}


function main(){
    console.log("Welcome to Paint Store. Here are your options:");

    let color=getPaint();
    let price=paintPrice(color);
    
    //tell the customer what they chose
    customerChoice(color, price);

    //get the amount of paint needed
    let measurement=getarea();

    //this doen't work because it's returning an object, and need to access the values as well. So how?
    //let total_price, total_liters=paintAmount(price, measurement);

    let total_price=paintAmount(price, measurement).total_price;
    let total_liters=paintAmount(price, measurement).total_liters;

    console.log ("Your total is $" + total_price + " for " + total_liters + " liters of " + color + " paint");

}

main();

