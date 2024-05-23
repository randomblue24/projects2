// Constructor is called when a new instance of GameBoard is created
const prompt = require('prompt-sync')();

class GameBoard {
    //initialized with size and numMines. Size=boad size, numMines=number of mines
    constructor(size, numMines) {
        this.size = size;
        this.numMines = numMines;
        //track # of revealed cells
        this.revealedCells = 0;
        //the board which is a 2d array, initialized with 0s
        this.board = this.initializeBoard(size);
        //trackboard which is a 2d array, initialized with false, tracks the board
        this.trackBoard = this.initializeBoard(size);
        //places mines
        this.placeMines();
        //numbers in the cells
        this.numberInCells();
    }

    // creating the actual board, and filling it with placeholder 0
    initializeBoard(size) {
        // idea: board is a 2d array [x][y] to hold the coordinates of the board
        let board = [];
        //we set the initial value of the cell to be 0
        let valueInCells = 0

        // we're looping through each row and filling it with 0's
        for (let i = 0; i < size; i++) {
            // we're creating a new row filled with 0's of size size
            let row = new Array(size).fill(valueInCells);
            // adding the row to the board
            board.push(row);
        }
        return board;
    }


    // function to place mines on the board
    placeMines() {

        //tracking number of mines we place
        let minesPlaced = 0;

        //while loop to place the mines
        //as long as there are mines left to place
        //we'll generate random coordinats for the mines and fill them up with mines
        while (minesPlaced < this.numMines) {
            // Generate random coordinates for the mine locations
            let randY = Math.floor(Math.random() * this.size);
            let randX = Math.floor(Math.random() * this.size);

            // if there's not already a mine at the random coordinate, we mark it with X
            if (this.board[randY][randX] !== 'X') {
                this.board[randY][randX] = 'X';
                minesPlaced++;
            }
        }
    }

    //function to calculate the #'s for e/ cell 
    //use the adjacent cells except the ones that have mines
    numberInCells() {
        let size = this.size;

        //iterating over each cell in the rows
        for (let y = 0; y < size; y++) {
            //iterating over each cell in the columns
            for (let x = 0; x < size; x++) {

                //if there's a mine, we skip it
                if (this.board[y][x] === 'X') {
                    continue; // Skip mines
                }

                // count adjacent mines
                let mineCount = 0;

                // Check all adjacent 
                //iterate over all neighboring cells around current cell
                //1st for loop iterates over rows iterates over the rows above, 
                //below, and including the current cell
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        //If we're on teh current cell then we skip the current cell
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        let newY = y + i;
                        let newX = x + j;

                        // Make sure adjacent cell is within bounds and check if it's a mine
                        if (newY >= 0 && newY < size && newX >= 0 && newX < size && this.board[newY][newX] === 'X') {
                            mineCount++;
                        }
                    }
                }

                // Set the cell's value to the number of adjacent mines
                this.board[y][x] = mineCount;
            }
        }
    }
    // function to show the adjacent cells one by one if they are 0
    showAdjacent(y, x) {
        let queue = [[y, x]];

        while (queue.length > 0) {
            //shift removes 1st elem
            //we're taking the end of array and returns it

            let [currentY, currentX] = queue.shift()
            //if the current  coordinates are less than 0 or greater than gameboard size we skip the current iteration
            if (currentY < 0 || currentY >= this.size || currentX < 0 || currentX >= this.size || this.trackBoard[currentY][currentX]) {
                continue;
            }
            //sets the current coordinate to show the cell was visited
            this.trackBoard[currentY][currentX] = true;
            //track # of revealed cells
            this.revealedCells++;

            // If the cell is a 0, shhow all adjacent cells w/o mines
            if (this.board[currentY][currentX] === 0) {
                //iterate over all neighboring cells around current cell
                //1st for loop iterates over rows iterates over the rows above, 
                //below, and including the current cell
                for (let i = -1; i <= 1; i++) {
                    //2nd for loop iterates over columns left, right, and including current cell
                    for (let j = -1; j <= 1; j++) {
                        //if i=0 and j=0 we skip the current cell
                        if (i === 0 && j === 0) {
                            continue;
                        }

                        let newY = currentY + i;
                        let newX = currentX + j;
                        //check if the neighboring cell is within bounds of the board
                        if (newY >= 0 && newY < this.size && newX >= 0 && newX < this.size && !this.trackBoard[newY][newX]) {
                            queue.push([newY, newX]);
                        }
                    }
                }
            }
        }
    }


    // function to show the cells and check for game over
    showCell(y, x) {
        if (this.board[y][x] === 'X') {
            console.log('Game Over!');
            //print the entire board including unshowed cells
            this.printBoard(true);
            //exit the program if it is a game over
            process.exit();
        } else {
            //if it's not a game over we show the cell 
            //and check for adjacent cells
            this.showAdjacent(y, x);
            if (this.revealedCells === this.size * this.size - this.numMines) {
                console.log('Congratulations! You won!');
                //show entire board
                this.printBoard(true); 
                process.exit();
            }
            /*
            if((this.trackBoard) === this.numberInCells()) {
                console.log('You won!');
                this.printBoard(true);
                process.exit();
            }*/
        }
    }
        //function to display the entire sweeper board
        //If showall is true then we show the board by looping through the 2d array
        //If its false, cover board with asterisks
        printBoard(showAll = false) {

            // print horizontal coordinate scale 1st
            let horizontalScale = '';
            for (let i = 0; i < this.size; i++) {
                horizontalScale += ' ' + (i + 1).toString().padStart(2, '') + '';
            }
            console.log(horizontalScale);

            // Print the board with vertical coordinate scale
            for (let y = 0; y < this.size; y++) {
                let row = (y + 1).toString().padStart(0, ' ') + ' ';
                //if showall is true or the trackboard is true then print the entire board board
                for (let x = 0; x < this.size; x++) {
                    if (showAll || this.trackBoard[y][x]) {
                        row += this.board[y][x] + ' ';
                    } else {
                        row += '* ';
                    }
                }
                console.log(row);
            }
        }

        // play function to start the game
        play() {
            //print the board 1st
            this.printBoard();

            // loop to get user input
            //so we want to get the user input and then check against it if its valid
            //if its valid we want to check if it's a mine or not and show it
            while (true) {
                let input = prompt('Enter coordinates (row,col): ');

                //here we use the spit function to split the input into array of substrings based on comma
                //we then use map functon to convert e/ lement in string array into #
                let [y, x] = input.split(',').map(Number);
                //if the user doens't enter a nmber or enters a # that's bigger than gameboard size we do an error message
                if (isNaN(y) || isNaN(x) || y < 0 || y >= this.size + 1 || x < 0 || x >= this.size + 1) {
                    console.log('Invalid coordinates. Please try again.');
                } else {
                    //if the user enters a number we show it
                    //subtract 1 because arrays start from 0, and user input starts from 1
                    this.showCell(y - 1, x - 1);
                }
                this.printBoard();
            }
        }

    }


//size of board
//let size = 2;
let size = 3;
//number of mines
//let numMines = 0;
let numMines = 1;

//initializing the gameboard
let game = new GameBoard(size, numMines);
game.play();
