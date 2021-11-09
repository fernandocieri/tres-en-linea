let firstRow = [...document.getElementsByClassName('firstrow')];
let secondRow = [...document.getElementsByClassName('secondrow')];
let thirdRow = [...document.getElementsByClassName('thirdrow')];
//let rows = [firstRow, secondRow, thirdRow];

let firstColumn = [...document.getElementsByClassName('firstcell')];
let secondColumn = [...document.getElementsByClassName('secondcell')];
let thirdColumn = [...document.getElementsByClassName('thirdcell')];
//let columns = [firstColumn, secondColumn, thirdColumn];

let leftRightDiagonal = [document.querySelector('.firstrow.firstcell'), /*document.querySelector('.secondrow.secondcell'),*/ document.querySelector('.thirdrow.thirdcell')];
let rightLeftDiagonal = [document.querySelector('.firstrow.thirdcell'), document.querySelector('.secondrow.secondcell'), document.querySelector('.thirdrow.firstcell')];
//let diagonals = [leftRightDiagonal, rightLeftDiagonal];

let board = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, leftRightDiagonal, rightLeftDiagonal];

//Checks if there are three equal values in one line
function checkRowsAndCols(line) {
    let equalCells = 0;
    let player;
    for (curr = 1, prev = 0; curr < line.length; curr++, prev++) {
        if ((line[curr].innerHTML == line[prev].innerHTML) && (line[curr].innerHTML != undefined)) {
            equalCells++;
            player = line[curr].innerHTML;
        }
    }
    return (equalCells == 2 ? player : undefined);
}

let turn = 0;
let gameData = { winner: undefined, gameOver: false, availableMovements: 9 };

function gameplay(tile) {

    if ((tile.innerHTML == 'X') || (tile.innerHTML == 'O')) {
        alert('No puedes seleccionar un espacio que ya está usado');
        return false
    }
    (turn % 2 == 0) ? (tile.innerHTML = 'X') : (tile.innerHTML = 'O');
    

    for (boardSection of board) {
        let result = checkRowsAndCols(boardSection);
        if (result != undefined) { gameData.winner = result };
    }
    gameData.availableMovements--;
    turn++;
    if (gameData.winner != '') {console.log(gameData.winner);}

}