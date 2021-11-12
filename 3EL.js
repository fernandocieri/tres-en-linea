let firstRow = [...document.getElementsByClassName('firstrow')];
let secondRow = [...document.getElementsByClassName('secondrow')];
let thirdRow = [...document.getElementsByClassName('thirdrow')];

let firstColumn = [...document.getElementsByClassName('firstcell')];
let secondColumn = [...document.getElementsByClassName('secondcell')];
let thirdColumn = [...document.getElementsByClassName('thirdcell')];

let leftRightDiagonal = [document.querySelector('.firstrow.firstcell'), document.querySelector('.secondrow.secondcell'), document.querySelector('.thirdrow.thirdcell')];
let rightLeftDiagonal = [document.querySelector('.firstrow.thirdcell'), document.querySelector('.secondrow.secondcell'), document.querySelector('.thirdrow.firstcell')];

let board = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, leftRightDiagonal, rightLeftDiagonal];

let gameData = { winner: undefined, turn: 0, clearCells: 9, xRecord: 0, oRecord: 0 };
//let frontBoard = document.getElementById('gameboard');
const frontScore = document.getElementById('marker');
let winnerAnnouncement = document.getElementById('winner-announcement');
let tieAnnouncement = document.getElementById('tie-announcement')

//Checks if there are three equal values in one row, column or diagonal;
function checkRowsColsDiagonals(line) {
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

function closeMessage() {
    winnerAnnouncement.classList.replace('visible-message-output', 'not-visible-output');
    tieAnnouncement.classList.replace('visible-message-output', 'not-visible-output');
    let champion = document.getElementById('champion');
    if (champion) { champion.remove() };
    document.querySelector('header').appendChild(frontScore)
}

function resetGame() {
    for (boardSection of board) {
        boardSection.map((tile) => {
            tile.innerHTML = '';
            if (tile.classList.contains('Xtile')) {
                tile.classList.remove('Xtile');
            } else if (tile.classList.contains('Otile')) {
                tile.classList.remove('Otile');
            }
        })
    }
    gameData.turn = 0;
    gameData.clearCells = 9;
    gameData.winner = undefined;
    closeMessage();
}

resetScores = () => {
    gameData.xRecord = 0;
    gameData.oRecord = 0;

    document.getElementById('X-record').innerHTML = gameData.xRecord;
    document.getElementById('O-record').innerHTML = gameData.oRecord;
}

//Checks if there's a winner yet. If so, displays winner-announcement. Otherwise checks if the game ended in tie. If so, displays tie-announcement;
WinnerOrTieEvents = () => {
    if (gameData.winner != undefined) {
        gameData.winner == 'X' ? gameData.xRecord++ : gameData.oRecord++;

        let winnerMessage = document.createElement('p');
        winnerMessage.innerHTML = gameData.winner;
        winnerMessage.innerHTML == 'X' ? winnerMessage.classList.add('Xtile') : winnerMessage.classList.add('Otile');
        winnerMessage.setAttribute('id', 'champion')
        document.getElementById('winner').appendChild(winnerMessage);
        winnerAnnouncement.appendChild(frontScore);
        winnerAnnouncement.classList.replace('not-visible-output', 'visible-message-output')


        document.getElementById('X-record').innerHTML = gameData.xRecord;
        document.getElementById('O-record').innerHTML = gameData.oRecord;

    } else if ((gameData.clearCells == 0) && (gameData.winner == undefined)) {
        tieAnnouncement.classList.replace('not-visible-output', 'visible-message-output');
        tieAnnouncement.appendChild(frontScore);
    }
}

function gameplay(tile) {

    if (gameData.winner != undefined) {
        alert('Reinicia la partida para volver a jugar');
        return false;
    }

    //Prevents users from selecting an already filled tile;
    if ((tile.innerHTML == 'X') || (tile.innerHTML == 'O')) {
        alert('No puedes seleccionar un espacio que ya está usado');
        return false;
    }

    //Decides whose turn it is;
    if (gameData.turn % 2 == 0) {
        tile.innerHTML = 'X'
        tile.classList.add('Xtile');
    } else {
        tile.innerHTML = 'O'
        tile.classList.add('Otile')
    }

    //Row, column and/or diagonal where tile is place;
    let tilePosition = [];

    //Iterates through board to find the position of the tile;
    for (boardSection of board) {
        if (boardSection.includes(tile)) {
            tilePosition.push(boardSection);
        }
    }

    //Iterates over tilePosition calling checkRowsColsDiagonals, looking for a line with three equal tiles;
    for (line of tilePosition) {
        let result = checkRowsColsDiagonals(line);
        if (result != undefined) {
            gameData.winner = result;
            tilePosition = [];
            break;
        }
    }

    gameData.clearCells--;
    gameData.turn++;

    WinnerOrTieEvents();
}