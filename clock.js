const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("p"),
    clockCalender = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getCalender() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay(); 
    const weekday = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']

    clockCalender.innerText = `${year}년 ${month}월 ${dayOfMonth}일 ${weekday[dayOfWeek]}`;
}


function init() {
    getTime();
    getCalender();
    setInterval(getTime, 500);
}

init();