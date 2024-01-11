const createStopwatch = (displayId, startId, stopId, laps) => {
    let elaspedTime = 0;
    let intervalId;
    let elapsedStartTime = 0;
    const lapsData = [];
    const totalTime = [];

    const startTime = function(){
        elaspedTime += 1000;
        displayTime();
    }

    const start = () => {
        elapsedStartTime = Date.now();
        intervalId = setInterval(startTime,1000);
        document.getElementById(startId).disabled=true;
        document.getElementById(stopId).disabled=false;
        }

    const stop = () => {
        clearInterval(intervalId);
        document.getElementById(startId).disabled=false;
        document.getElementById(stopId).disabled=true;
        totalTime.push(elaspedTime/1000);
        const elapsedTimeInSeconds = Math.floor((Date.now() - elapsedStartTime) / 1000);;
        lapsData.push(elapsedTimeInSeconds);
        updateLapsDisplay();
    }

    const updateLapsDisplay = () => {
        const lapsContainer = document.getElementById(laps);
        lapsContainer.innerHTML="";

        for (let i = 0; i < lapsData.length; i++) {
            const lapItem = document.createElement("div");
            const lap2Item = document.createElement("div");
            lapItem.classList.add("lap-item");
            lap2Item.classList.add("lap2-item");
            lapItem.textContent = `Lap ${i + 1}: ${formatTime(lapsData[i])}`;
            lap2Item.textContent = `Total Elasped Time ${formatTime(totalTime[i])}`;
            lapsContainer.appendChild(lapItem);
            lapsContainer.appendChild(lap2Item);
        }
    }

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${(hours < 10 ? '0' : '')}${hours}:${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
    const reset = () => {
        elaspedTime = 0;
        document.getElementById(displayId).textContent = "00:00:00";
        lapsData.length = 0;
        updateLapsDisplay();
    }

    const displayTime = () => {
        const hours = Math.floor(elaspedTime/3600000);
        const minutes = ((elaspedTime % 3600000) / 60000).toFixed(0);
        const seconds = ((elaspedTime % 60000) / 1000).toFixed(0);
        document.getElementById(displayId).textContent = `${(hours < 10 ? '0' : '')}${hours}:${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    return {
        start,
        stop,
        reset,
        displayTime,
    };
}

const stopwatch1 = createStopwatch('display1','start1','stop1','laps1');
const stopwatch2 = createStopwatch('display2','start2','stop2','laps2');
const stopwatch3 = createStopwatch('display3','start3','stop3','laps3');

document.querySelector("#start1").addEventListener("click", stopwatch1.start);
document.querySelector("#stop1").addEventListener("click", stopwatch1.stop);
document.querySelector("#reset1").addEventListener("click", stopwatch1.reset);

document.querySelector("#start2").addEventListener("click", stopwatch2.start);
document.querySelector("#stop2").addEventListener("click", stopwatch2.stop);
document.querySelector("#reset2").addEventListener("click", stopwatch2.reset);

document.querySelector("#start3").addEventListener("click", stopwatch3.start);
document.querySelector("#stop3").addEventListener("click", stopwatch3.stop);
document.querySelector("#reset3").addEventListener("click", stopwatch3.reset);
