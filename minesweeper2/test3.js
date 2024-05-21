class GameBoard {
    // Constructor is called when a new instance of GameBoard is created
    // Size of gameboard is 8, and probability of mine is 0.1
    constructor(size = 8, probability = 0.1) {
        this.size = size;
        this.probability = probability;
        this.board = this.createBoard();
    }

    // Create the gameboard with 2D arrays
    createBoard() {
        const board = [];
        // This iterates over the rows
        for (let y = 0; y < this.size; y++) {
            board.push([]);
            // This iterates over the columns
            for (let x = 0; x < this.size; x++) {
                board[y][x] = Math.random() < this.probability ? 'O' : '0';
            }
        }
        return board;
    }

    printBoard() {
        for (let i = 0; i < this.size; i++) {
            console.log(this.board[i].join(' '));
        }
    }

    //boardUpadte updates the matrix to show bombs
    //If user picks a coordinate, function will check against list of mines. If it's a mine, it will say game over.
    //If it's not a mine, will show the number of surrounding locations. And update the board visually
    boardUpdate(mines, y, x) {
        // Code that updates the gameboard

        // If user picks a coordinate, function will check against list of mines. If it's a mine, it will say game over.
        switch (this.board[y][x]) {
            case 'mine':
                for(let y = 0; y < this.size; y++) {
                    for(let x = 0; x < this.size; x++) {
                        if(mines.includes(this.board[y][x])) {
                            this.board[y][x] = 'X';
                        }
                    }
                }
 
                if(this.board[y][x] === 'X') {
                    console.log('Game Over!');
                    process.exit(0);
                };


            break;

        // If it's not a mine, will show the number of surrounding locations. And update the board visually
        default:
            break;
        }   
        

        /*
        this.board = [];
        for (let y = 0; y < this.size; y++) {
            this.board.push([]);
            // This iterates over the columns
            for (let x = 0; x < this.size; x++) {
                this.board[y][x] = Math.random() < this.probability ?8 'O' : '0';
            }
        }
        */
    }
}

function main() {
    const size = 8;
    const probability = 0.1;

    const game = new GameBoard(size, probability);
    game.printBoard(); // Print initial board

    console.log("\nUpdating board...\n");

    game.boardUpdate();
    game.printBoard(); // Print updated board

    console.log("\nGenerating numbers board...\n");

    const numbers = [];

    for (let y = 0; y < size; y++) {
        numbers.push([]);
        // This iterates over the columns
        for (let x = 0; x < size; x++) {
            if (Math.random() < probability) {
                // Generate random # from 1 - 8, with a probability of 0.1 chance of a # being in a cell
                numbers[y][x] = Math.floor(Math.random() * 8) + 1;
            } else {
                numbers[y][x] = '0';
            }
        }
    }

    for (let i = 0; i < size; i++) {
        console.log(numbers[i].join(' '));
    }
}

main();
