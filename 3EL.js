let firstRow = [...document.getElementsByClassName('firstrow')];
let secondRow = [...document.getElementsByClassName('secondrow')];
let thirdRow = [...document.getElementsByClassName('thirdrow')];
//let rows = [firstRow, secondRow, thirdRow];

let firstColumn = [...document.getElementsByClassName('firstcell')];
let secondColumn = [...document.getElementsByClassName('secondcell')];
let thirdColumn = [...document.getElementsByClassName('thirdcell')];
//let columns = [firstColumn, secondColumn, thirdColumn];

let leftRightDiagonal = [document.querySelector('.firstrow.firstcell'), document.querySelector('.secondrow.secondcell'), document.querySelector('.thirdrow.thirdcell')];
let rightLeftDiagonal = [document.querySelector('.firstrow.thirdcell'), document.querySelector('.secondrow.secondcell'), document.querySelector('.thirdrow.firstcell')];
//let diagonals = [leftRightDiagonal, rightLeftDiagonal];

let board = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, leftRightDiagonal, rightLeftDiagonal];

//Checks if there are three equal values in one row, column or diagonal;
function checkRowsAndCols(line) {
    let equalCells = 0;
    let player;
    for (curr = 1, prev = 0; curr < line.length; curr++, prev++) {
        if ((line[prev].innerHTML != '') && (line[prev].innerHTML == line[curr].innerHTML)) {
            equalCells++;
            player = line[prev].innerHTML;
        }
        if (equalCells == 2) {
            return player;
        }
    }
}

function resetGame() {
    for (boardSection of board) {
        boardSection.map((tile) => tile.innerHTML = '');
    }
}

let turn = 0;
let gameData = { winner: undefined, clearCells: 8, xRecord: 0, oRecord: 0 };
let frontBoard = document.getElementById('gameboard');

function resetScores() {
    gameData.xRecord = 0;
    gameData.oRecord = 0;

    document.getElementById('X-record').innerHTML = gameData.xRecord;
    document.getElementById('O-record').innerHTML = gameData.oRecord;
}

function gameplay(tile) {

    if (gameData.clearCells == 0) {
        let tieAnnouncement = document.createElement('div');
        tieAnnouncement.classList.add('output-message');
        tieAnnouncement.setAttribute('id', 'tie');
        tieAnnouncement.innerHTML = '¡Empate!'
        frontBoard.appendChild(tieAnnouncement);
    }

    if ((tile.innerHTML == 'X') || (tile.innerHTML == 'O')) {
        alert('No puedes seleccionar un espacio que ya está usado');
        return false
    }
    (turn % 2 == 0) ? (tile.innerHTML = 'X') : (tile.innerHTML = 'O');


    for (boardSection of board) {
        let result = checkRowsAndCols(boardSection);
        if (result != undefined) {
            gameData.winner = result;
            break;
        }
    }

    if (gameData.winner != undefined) {
        gameData.winner == 'X' ? gameData.xRecord++ : gameData.oRecord++;

        //creates an element announcing the winner;
        let winnerAnnouncement = document.createElement('div');
        winnerAnnouncement.classList.add('output-message');
        winnerAnnouncement.setAttribute('id', 'winner');
        winnerAnnouncement.innerHTML = `El ganador es ${gameData.winner}`;
        frontBoard.appendChild(winnerAnnouncement);

        document.getElementById('X-record').innerHTML = gameData.xRecord;
        document.getElementById('O-record').innerHTML = gameData.oRecord;
    }

    gameData.clearCells--;
    turn++;
}