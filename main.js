'use strict'



var gNumOfCells = 16
var gCells = shuffle(makeBoard(gNumOfCells))
var gCellsIdxs = makeBoard(gNumOfCells)
var gCount = 1
var gNextNumber = gCount




console.log('shuffled', gCells)
console.log('regular', gCellsIdxs)

function onInit() {

    chooseLevel()
    renderBoard(gCells)

    renderNextNumber()
}

function renderNextNumber() {
    var strHTML = ''
    if (gNextNumber <= gNumOfCells) {
        strHTML += ` <h3>Next Number: ${gNextNumber}</h3>`

        const elNextNum = document.querySelector('.next-number')
        elNextNum.innerHTML = strHTML
    }
}


function renderBoard(board) {
    var strHTML = ''
    var boardSize
    if (board.length === 16) boardSize = board.length / 4
    else if (board.length === 25) boardSize = board.length / 5
    else boardSize = board.length / 6

    for (var i = 0; i < boardSize; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < boardSize; j++) {
            const dataAttrStr = `data-i="${i}"`
            strHTML += `\t<td onclick="onCellClicked(this)">${gCells.pop()} </td>\n`

        }
        strHTML += `</tr>\n`
    }

    const elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML


    // console.table(board)
    // console.log(strHTML);
}


function makeBoard(numOfCells) {
    var myBoard = []
    for (var i = 0; i < numOfCells; i++) {
        myBoard[i] = i + 1
    }
    return myBoard
}


function shuffle(items) {
    var randIdx
    var keep
    var i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}





function onCellClicked(elCell) {
    if (gCount === +elCell.innerText) {
        // First update the model...
        console.log(elCell.innerText)
        gCount++

        console.log(gNextNumber)
        gNextNumber++
        elCell.style.cssText += 'color:red;background-color:#FFFF99'; // ...then update the DOM

        if (+elCell.innerText === 1) {
            startTimer()

            var gameAudio = new Audio('sound/1.mp3');
            gameAudio.play();
        }
        renderNextNumber()
    }
}


function chooseLevel() {

    var levelHTML = ''


    levelHTML += `<button onclick="onLevelClick(this)"> Easy</button>`
    levelHTML += `<button onclick="onLevelClick(this)"> Normal</button>`
    levelHTML += `<button onclick="onLevelClick(this)"> Heroic</button>`

    const elLevelBtn = document.querySelector('.level')
    elLevelBtn.innerHTML = levelHTML


}

function onLevelClick(elBtn) {

    var allLevelButtons = document.querySelectorAll('button');
    allLevelButtons.forEach(button => {
        button.classList.remove('level-button');
        button.style.cssText = 'color:rgb(228, 223, 223);background-color:rgb(49, 129, 160)';
    });

    // elBtn.style.cssText = 'color:rgb(228, 223, 223);background-color:rgb(49, 129, 160)';

    if (elBtn.innerText === 'Easy') {
        elBtn.style.cssText = 'color:red;background-color:rgb(242, 236, 116)';
        gNumOfCells = 16
    }
    else if (elBtn.innerText === 'Normal') {
        elBtn.style.cssText = 'color:red;background-color:rgb(242, 236, 116)';
        gNumOfCells = 25
    }
    else if (elBtn.innerText === 'Heroic') {
        elBtn.style.cssText = 'color:red;background-color:rgb(242, 236, 116)';
        gNumOfCells = 36
    }

    gCells = shuffle(makeBoard(gNumOfCells))
    renderBoard(gCells)
}







//////////////////////////////////////////


var gStartTime; // Global variable to store the start time of the timer
var gTimerInterval; // Global variable to store the interval ID for the timer

// Add this function to start the timer
function startTimer() {
    gStartTime = Date.now(); // Record the current timestamp as the start time

    function updateTimer() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - gStartTime;

        var seconds = ((elapsedTime % 60000) / 1000).toFixed(3);

        document.querySelector('.timer').textContent = `Time Elapsed: ${seconds}`;
    }

    updateTimer(); // Update the timer immediately
    gTimerInterval = setInterval(updateTimer, 1); // Update the timer every second (1000ms)
}

// Call startTimer function to start the timer





