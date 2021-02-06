//stopwatch variables
var time = 0;
var tenths;
var sec;
var min;
var elTimer = document.querySelectorAll('.timer').innerText;
var isRunning = false;


function startTimer() {
    if (isRunning === false) isRunning = true;              //currently the "ifs" in the start and stop functions are unnesessary but for utilization
    timerCycle();
}

function stopTimer() {
    if (isRunning === true) isRunning = false;
}

function timerCycle() {
    if (isRunning === true) {
        tenths = time % 10;
        sec = Math.floor(time / 10);
        min = Math.floor(time / 10 / 60);

        // tenths += 1;
        time++

        if (tenths === 100) {
            sec += 1;
            min = 0;
        }

        // sec += 1;

        if (sec === 60) {
            min += 1;
            sec = 0;
        }
        // cannot count over 1 hour currently

        if (tenths < 10 || tenths === 0) tenths = '0' + tenths;

        if (sec < 10 || sec === 0) sec = '0' + sec;

        if (min < 10 || min === 0) min = '0' + min;

        elTimer = min + ':' + sec + ':' + tenths;

        setTimeout(timerCycle(), 100);
    }
}

function resetTimer() {
    elTimer = '00:00:00';
    time = 0;
    isRunning = false;
}
