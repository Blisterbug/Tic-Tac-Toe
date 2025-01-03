let currentPlayer = "X";

function clearBoard() {
    const boardRef = document.getElementsByClassName('tic-tac-toe')[0]
    boardRef.innerHTML = ''; // clearing the board 

    const userInput = document.getElementsByClassName('user-input')[0]
    userInput.innerHTML = ``;

    document.querySelector('.turn-display').textContent = '';
}

function createBoard() {
    const gridSize = (() => {
        const inputValue = parseInt(document.querySelector('.grid-input').value) || 3; // Get the input value or default to 3

        return inputValue % 3 === 0 ? inputValue : 3; // Ensure the value is a multiple of 3, otherwise default to 3
    })();

    const boardRef = document.getElementsByClassName('tic-tac-toe')[0]

    boardRef.innerHTML = ''; // clearing the board before creating another

    for (let i = 0; i < gridSize; i++) {
        const rowRef = document.createElement("div") // creating element for row
        rowRef.className = "row" // naming element created

        for (let j = 0; j < gridSize; j++) {
            const cellRef = document.createElement("div") // creating element for cells
            cellRef.className = "cell" // naming the element created
            rowRef.appendChild(cellRef) // appending the cells to row
        }
        boardRef.appendChild(rowRef) // appending the row to the board

        var validGridSize = document.querySelector('.grid-input').value
        const userInput = document.getElementsByClassName('user-input')[0]
        userInput.innerHTML = `The grid created here ${validGridSize}x${validGridSize}`
    }
    document.querySelector('.grid-input').value = '';
    boardRef.addEventListener('click', handleCellClick);
}

function handleCellClick(event) {
    const cell = event.target;

    if (!cell.classList.contains('cell')) return;
    if (cell.textContent !== '') return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
        document.querySelector('.turn-display').textContent = `Player ${currentPlayer} wins!`;
        document.getElementsByClassName('tic-tac-toe')[0].removeEventListener('click', handleCellClick);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('.turn-display').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const boardRef = document.getElementsByClassName('tic-tac-toe')[0];
    const rows = Array.from(boardRef.getElementsByClassName('row')).map(row => Array.from(row.getElementsByClassName('cell')));
    const gridSize = rows.length;

    // Check rows
    for (let i = 0; i < gridSize; i++) {
        if (rows[i].every(cell => cell.textContent === currentPlayer)) {
            rows[i].forEach(cell => cell.classList.add('strike-through')); // Apply strike-through to the row
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < gridSize; i++) {
        if (rows.every(row => row[i].textContent === currentPlayer)) {
            rows.forEach(row => row[i].classList.add('strike-through')); // Apply strike-through to the column
            return true;
        }
    }

    // Check diagonals
    if (rows.every((row, index) => row[index].textContent === currentPlayer)) {
        rows.forEach((row, index) => row[index].classList.add('strike-through')); // Apply strike-through to top-left to bottom-right diagonal
        return true;
    }
    if (rows.every((row, index) => row[gridSize - 1 - index].textContent === currentPlayer)) {
        rows.forEach((row, index) => row[gridSize - 1 - index].classList.add('strike-through')); // Apply strike-through to top-right to bottom-left diagonal
        return true;
    }

    return false;
}

