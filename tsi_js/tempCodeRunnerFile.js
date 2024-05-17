//importing promptsync to handle user input output
const prompt = require("prompt-sync")();

//function to get paint price
function paintPrice(paintType, color) {

    const regularPaint = {"white": 20, "black": 25, "blue": 30, "red": 35, "green": 40 };
    const premiumPaint= {"white": 25, "black": 30, "blue": 35, "red": 40, "green": 45};

    //using switch case to return correct price
    switch (paintType=="regular") {
        case "white":
            return regularPaint["white"];
        case "blue":
            return regularPaint["blue"];
        case "green":
            return regularPaint["green"];
        case "red":
            return regularPaint["red"];
        case "black":
            return regularPaint["black"];
        default:
            return;
    }
    switch (paintType=="premium") {
        case "white":
            return regularPaint["white"];
        case "blue":
            return regularPaint["blue"];
        case "green":
            return regularPaint["green"];
        case "red":
            return regularPaint["red"];
        case "black":
            return regularPaint["black"];
        default:
            return;
    }
}

function getPaint() {
    //note, input is a function in js
    console.log("\nRegular: \nWhite: $20 /liter \nBlack: $25 /liter \nBlue: $30 /liter \nRed: $35 /liter \nGreen: $40 /liter");
    console.log("\nPremium: \nWhite: $25 /liter \nBlack: $30 /liter \nBlue: $35 /liter \nRed: $40 /liter \nGreen: $45 /liter \n");
    
    let paintType = prompt("Please choose Regular or Premium Paint: ");
    paintType=paintType.toLowerCase();

    //while loop to ensure correct input and stop users from entering invalid inputs
    while (paintType!=="regular" &&  paintType!=="premium") {
        paintType=prompt("Invalid choice, Please choose again: ");
        paintType=paintType.toLowerCase();
    }

    paintColor = prompt("Please choose paint color: ").toLowerCase();
    paintColor=paintColor.toLowerCase();

    //while loop to ensure correct input and stop users from entering invalid inputs
    while (paintColor!=="red" &&  paintColor!=="green" && paintColor!=="blue" && paintColor!=="white" && paintColor!=="black") {
        paintColor=prompt("Invalid choice, Please choose again: ")
        paintColor=paintColor.toLowerCase();

    }

    return{
        paintType: paintType,
        paintColor: paintColor
    }

}

//Let the user provide how many walls and measurements of said walls
function getarea(){
    let walls=0;

    //isNaN is a function in js checks if the input is a number or not
    while(walls<=0 || isNaN(walls)){
        //Number() returns teh value as a #, if not a # returns NaN
        walls=Number(prompt("How many walls do you need? "));
        // Check if the user input is a valid number.
        if(walls<=0 || isNaN(walls)){
            console.log("Please enter valid number");
        }
    }
    let typeofwall;
    let total_squareft=0;
    let base=0;
    let height=0;

    for (let i=0; i<walls; i++){
        typeofwall=prompt("What type of wall is it: Rectangle, Triangle: ");
        typeofwall=typeofwall.toLowerCase();

        while(typeofwall!=="rectangle" && typeofwall!=="triangle"){
            typeofwall=prompt("Invalid choice, Please choose again: ");
            typeofwall=typeofwall.toLowerCase();
        }

        switch (typeofwall) {
            case "rectangle":
                //Number() returns the value as a #, if not a # returns NaN
                base=Number(prompt("Measurement of  wall base: "));
                
                // Check if the user input is a valid number.
                while(base<=0 || isNaN(base)){
                    console.log("Please enter valid number");
                    base=Number(prompt("Measurement of  wall base: "));
                }
                
                height=Number(prompt("Height of wall: "));
                while(height<=0 || isNaN(height)){
                    console.log("Please enter valid number");
                    height=Number(prompt("Measurement of wall height: "));
                }

                total_squareft=total_squareft+(base*height);

                break;
            
            case "triangle":
                //Number() returns the value as a #, if not a # returns NaN
                base=Number(prompt("Measurement of  wall base: "));
                
                // Check if the user input is a valid number.
                while(base<=0 || isNaN(base)){
                    console.log("Please enter valid number");
                    base=Number(prompt("Measurement of  wall base: "));
                }
                
                height=Number(prompt("Height of wall: "));
                while(height<=0 || isNaN(height)){
                    console.log("Please enter valid number");
                    height=Number(prompt("Measurement of wall height: "));
                }

                total_squareft=total_squareft+((base*height)/2);

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

    //This is wrong. Calls the function getPaint twice
    //let paintType=getPaint().paintType;
    //let color=getPaint().paintColor;

    //create a similar object with the getPaint function to get the paint type and color
    const paint=getPaint();
    const paintType=paint.paintType;
    const color=paint.paintColor;

    const price=paintPrice(paintType, color);
    
    //tell the customer what they chose
    customerChoice(color, price);

    //get the amount of paint needed
    const measurement=getarea();

    //this doen't work because it's returning an object, and need to access the values as well. So how?
    //let total_price, total_liters=paintAmount(price, measurement);

    const paintamount=paintAmount(price, measurement);
    const total_price=paintamount.total_price;
    const total_liters=paintamount.total_liters;

    //let {total_price, total_liters}=paintAmount(price, measurement);
    //let total_liters=paintAmount(price, measurement).total_liters;

    console.log ("Your total is $" + total_price + " for " + total_liters + " liters of " + color + " paint");

}

main();

