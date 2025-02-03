let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let addTimeButton = document.getElementById("addTime");
let info = document.getElementById("info");

// Time in seconds
let time = 60;
let timerInterval;
let extraTimeInterval;

function start() {
    startButton.style.display = "none";
    addTimeButton.style.display = "block";
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer.innerText = getTime();
    if (time <= 0) {
        clearInterval(timerInterval);
        clearInterval(extraTimeInterval);
        addTimeButton.style.display = 'none';

        info.style.color = 'red';
        info.style.opacity = 1;
        info.innerText = 'You Lose!';
    } else {
        time--;
    }
}

function addTime() {
    let randomTime = Math.floor(Math.random() * 5) + 1;
    if (randomTime === 5) {
        prompt("Describe a networking concept (200 words)");
    }
    time += randomTime;
    timer.innerText = getTime();
    showExtraTime(randomTime);
    moveButtonRandomly();
}

function moveButtonRandomly() {
    let randomX = Math.max(Math.floor(Math.random() * window.innerWidth - 100), 0);
    let randomY = Math.max(Math.floor(Math.random() * window.innerHeight - 30), 0);
    addTimeButton.style.left = `${randomX}px`;
    addTimeButton.style.top = `${randomY}px`;
}

function showExtraTime(time) {
    clearInterval(extraTimeInterval);
    info.innerText = `+${time} seconds`;
    info.style.opacity = 1;
    extraTimeInterval = setTimeout(() => {
        info.style.opacity = 0;
    }, 750);
}

function getTime() {
    let hours = parseInt(time / 3600);
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
