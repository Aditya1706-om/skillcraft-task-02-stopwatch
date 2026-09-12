
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");


// =========================
// VARIABLES
// =========================

let startTime = 0;

let elapsedTime = 0;

let timerInterval = null;

let running = false;

let lapNumber = 0;


// =========================
// FORMAT TIME
// =========================

function formatTime(time) {

    let hours = Math.floor(time / 3600000);

    let minutes = Math.floor(
        (time % 3600000) / 60000
    );

    let seconds = Math.floor(
        (time % 60000) / 1000
    );

    let milliseconds = time % 1000;


    hours = String(hours).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    seconds = String(seconds).padStart(2, "0");

    milliseconds = String(milliseconds).padStart(3, "0");


    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


// =========================
// UPDATE DISPLAY
// =========================

function updateDisplay() {

    const currentTime =
        Date.now() - startTime + elapsedTime;

    display.textContent = formatTime(currentTime);
}


// =========================
// START / RESUME
// =========================

function startTimer() {

    if (running) {
        return;
    }


    startTime = Date.now();

    running = true;


    timerInterval = setInterval(
        updateDisplay,
        10
    );


    startBtn.textContent = "Resume";
}


// =========================
// PAUSE
// =========================

function pauseTimer() {

    if (!running) {
        return;
    }


    elapsedTime += Date.now() - startTime;

    clearInterval(timerInterval);

    running = false;


    startBtn.textContent = "Resume";
}


// =========================
// RESET
// =========================

function resetTimer() {

    clearInterval(timerInterval);


    startTime = 0;

    elapsedTime = 0;

    running = false;

    lapNumber = 0;


    display.textContent =
        "00:00:00.000";


    startBtn.textContent = "Start";


    lapList.innerHTML = "";
}


// =========================
// LAP
// =========================

function recordLap() {

    if (!running && elapsedTime === 0) {
        return;
    }


    let currentTime;


    if (running) {

        currentTime =
            Date.now() - startTime + elapsedTime;

    } else {

        currentTime = elapsedTime;
    }


    lapNumber++;


    const li = document.createElement("li");


    const lapName =
        document.createElement("span");

    lapName.textContent =
        `Lap ${lapNumber}`;


    const lapTime =
        document.createElement("span");

    lapTime.textContent =
        formatTime(currentTime);


    li.appendChild(lapName);

    li.appendChild(lapTime);


    lapList.prepend(li);
}


// =========================
// BUTTON EVENTS
// =========================

startBtn.addEventListener(
    "click",
    startTimer
);


pauseBtn.addEventListener(
    "click",
    pauseTimer
);


lapBtn.addEventListener(
    "click",
    recordLap
);


resetBtn.addEventListener(
    "click",
    resetTimer
);