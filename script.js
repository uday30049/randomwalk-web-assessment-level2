// Selecting DOM elements
const statusDisplay = document.querySelector('.game--status');
const scoreDisplayX = document.querySelector('.score--x');
const scoreDisplayO = document.querySelector('.score--o');

// Game state variables
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

// Functions to generate messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Initial setup
statusDisplay.innerHTML = currentPlayerTurn();

// Winning conditions for Tic-Tac-Toe
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Function to change players
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Function to check the result of the game
function handleResultValidation() {
    let roundWon = false;

    // Check each winning condition
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        // If any winning condition is met
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Handle the result
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        updateScore();
        gameActive = false;
        return;
    }

    // If the game is a draw
    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // Switch to the next player's turn
    handlePlayerChange();
}

// Function to update the score
function updateScore() {
    if (currentPlayer === "X") {
        scoreX++;
        scoreDisplayX.innerHTML = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        scoreDisplayO.innerHTML = `Player O: ${scoreO}`;
    }
}

// Event listener for handling a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Ignore clicks if the cell is already occupied or the game is not active
    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    // Handle the cell click
    handleCellPlayed(clickedCell, clickedCellIndex);
    // Check the result of the game
    handleResultValidation();
}

// Event listener for restarting the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Set up event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
