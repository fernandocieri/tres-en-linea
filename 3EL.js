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
let frontScore = document.getElementById('marker');
let winnerAnnouncement = document.getElementById('winner-announcement');
let tieAnnouncement = document.getElementById('tie-announcement')

function resetScores() {
    gameData.xRecord = 0;
    gameData.oRecord = 0;

    document.getElementById('X-record').innerHTML = gameData.xRecord;
    document.getElementById('O-record').innerHTML = gameData.oRecord;
}

function gameplay(tile) {

    //prevents users from selecting an already filled tile;
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

        let winnerMessage = document.createElement('p');
        winnerMessage.innerHTML = `${gameData.winner}`;
        document.getElementById('winner').appendChild(winnerMessage);
        winnerAnnouncement.appendChild(frontScore);
        winnerAnnouncement.classList.replace('not-visible-output', 'visible-message-output')

        document.getElementById('X-record').innerHTML = gameData.xRecord;
        document.getElementById('O-record').innerHTML = gameData.oRecord;
    }

    //Checks if the game ended in tie;
    if ((gameData.clearCells == 0) && (gameData.winner == undefined)) {
        tieAnnouncement.classList.replace('not-visible-output', 'visible-message-output');
        tieAnnouncement.appendChild(frontScore);
    }
    gameData.clearCells--;
    turn++;
}