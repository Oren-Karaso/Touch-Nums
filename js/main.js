'use strict'
// general gloabal vriables
var gNums = [];
var gPreviousCell;
var gcountToWin;

//stopwatch variables
var tenths = 0;
var sec = 0;
var min = 0;
var gElTimer = document.querySelector('.timer');
var isRunning = false;

function init() {
    gcountToWin = 1;
    gPreviousCell = 0;
    resetTimer();
    initArray(16, gNums);
    shuffle(gNums);
    renderBoard(gNums);
}

function initArray(num, nums) {
    for (var i = 0; i < num; i++) {
        nums.push(i + 1);
    }
    return nums;
}

function renderBoard(nums) {
    // console.table(board);
    var strHtml = '';
    var index = 0;
    var numsSize = Math.sqrt(nums.length);
    // console.log(numsSize);

    for (var i = 0; i < numsSize; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < numsSize; j++) {
            var cell = nums.pop();
            index++;
            strHtml += `<td class="untouched"
            onclick="isSequent(this, ${index})">${cell}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function shuffle(nums) {
    var randIdx, keep, i;
    for (i = nums.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, nums.length - 1);

        keep = nums[i];
        nums[i] = nums[randIdx];
        nums[randIdx] = keep;
    }
    return nums;
}

function isSequent(elCell, idx) {
    var cell = Number(elCell.innerText);
    console.log('cell:', cell);
    if (!elCell.classList.contains('touched')) {
        if (cell === 1) {
            isRunning = true;
            setInterval(timerCycle, 100);
        }

        if (cell === gPreviousCell + 1) {
            elCell.classList.remove('untouched');
            elCell.classList.add('touched');
            gPreviousCell = cell;
            gcountToWin++;
            if (gcountToWin === 17) {
                stopTimer();
                alert('You won, Great!');
                return;
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function startTimer() {
    if (isRunning === false) isRunning = true;              //currently the "ifs" in the start and stop functions are unnesessary but for utilization
    timerCycle();
}

function stopTimer() {
    if (isRunning === true) isRunning = false;
}

function timerCycle() {
console.log('in function');
    if (isRunning === true) {
        tenths = parseInt(tenths);
        sec = parseInt(sec);
        min = parseInt(min);

        tenths += 10;
        if (tenths === 100) {
            // debugger
            tenth = 0;
            sec += 1;
            min = min;
        }

        // sec += 1;

        if (sec === 60) {
            min += 1;
            sec = 0;
            tenths = 0;
        }

        // min += 1;


        if (tenths < 10 || tenths === 0) tenths = '0' + tenths;

        if (sec < 10 || sec === 0) sec = '0' + sec;

        if (min < 10 || min === 0) min = '0' + min;
        console.log('min:', min + ' sec:', sec);

        gElTimer.innerText = min + ':' + sec + ':' + tenths;

    } else clearInterval();
}

function resetTimer() {
    gElTimer.innerText = '00:00:00';
    min = 0;
    sec = 0;
    tenths = 0;
    isRunning = false;
}
