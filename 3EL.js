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
const frontScore = document.getElementById('marker');
let selectPlayer = document.getElementById('player1');
let winnerAnnouncement = document.getElementById('winner-announcement');
let tieAnnouncement = document.getElementById('tie-announcement');


function closeMessage() {
    winnerAnnouncement.removeAttribute('open');
    tieAnnouncement.removeAttribute('open');
    let champion = document.getElementById('champion');
    if (champion) { champion.remove() };
    document.querySelector('header').appendChild(frontScore);
}

function selectFirstPlayer() {
    if (gameData.clearCells == 9) {
        (selectPlayer.value == 'X' ? gameData.turn = 0 : gameData.turn = 1);
    } else {
        (selectPlayer.value == 'X' ? selectPlayer.value = 'O' : selectPlayer.value = 'X');
        alert('No puedes hacer esto ahora. Termina o reinicia la partida e inténtalo de nuevo.');
    }
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
    selectFirstPlayer();
    closeMessage();
}

function resetScores() {
    gameData.xRecord = 0;
    gameData.oRecord = 0;
    
    document.getElementById('X-record').innerHTML = gameData.xRecord;
    document.getElementById('O-record').innerHTML = gameData.oRecord;
}

//Checks if there are three equal values in one row, column or diagonal;
function checkRowsColsDiagonals(line) {
    let equalCells = 0;
    let player;
    for (curr = 1, prev = 0; curr < line.length; curr++, prev++) {
        if ((line[prev].innerHTML != '') && (line[prev].innerHTML == line[curr].innerHTML)) {
            equalCells++;
            player = line[prev].innerHTML;
        }
        if (equalCells >= 2) {
            return player;
        }
    }
}

//Checks if there's a winner yet. If so, displays winner-announcement. Otherwise checks if the game ended in tie. If so, displays tie-announcement;
function WinnerOrTieEvents() {
    if (gameData.winner != undefined) {
        gameData.winner == 'X' ? gameData.xRecord++ : gameData.oRecord++;

        let winnerMessage = document.createElement('p');
        winnerMessage.innerHTML = gameData.winner;
        winnerMessage.innerHTML == 'X' ? winnerMessage.classList.add('Xtile') : winnerMessage.classList.add('Otile');
        winnerMessage.setAttribute('id', 'champion');
        document.getElementById('winner').appendChild(winnerMessage);

        document.getElementById('X-record').innerHTML = gameData.xRecord;
        document.getElementById('O-record').innerHTML = gameData.oRecord;
        winnerAnnouncement.appendChild(frontScore);

        winnerAnnouncement.setAttribute('open', '');

    } else if ((gameData.clearCells == 0) && (gameData.winner == undefined)) {
        tieAnnouncement.appendChild(frontScore);
        tieAnnouncement.setAttribute('open', '');
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

    //Filters board to find the position of the tile;
    let tilePosition = board.filter((boardSection) => {return boardSection.includes(tile)})

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