const yourplace = document.querySelector(".js-yourplace"),
    menuBtn = document.querySelector(".labelBtn");
const temp = document.querySelector(".js-temp"),
    tempMax = document.querySelector(".js-tempMax"),
    tempMin = document.querySelector(".js-tempMin"),
    tempFeel = document.querySelector(".js-tempFeel");

const API_KEY = 'dad98edbf3c83f30a5c44f0bd1bfc782';
const COORDS = 'coords';
const RESTEMPS = 'temps';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (json) {
            const place = json.name;

            const res_temp = json.main.temp;
            const res_temp_max = json.main.temp_max;
            const res_temp_min = json.main.temp_min;
            const res_temp_feel = json.main.feels_like;
            const res_temps = {
                res_temp,
                res_temp_max,
                res_temp_min,
                res_temp_feel
            }
            saveTemps(res_temps)
            yourplace.innerText = `${place}`
            menuBtn.innerText = ` 💨`
        });
}

function saveTemps(res_temps) {
    localStorage.setItem(RESTEMPS, JSON.stringify(res_temps));
}

function showTemps(event) {
    const originText = event.target;
    const resTemps = localStorage.getItem(RESTEMPS);
    const parsedTemps = JSON.parse(resTemps);

    if (originText.id === 'temp') {
        if (originText.innerText === '온도') {
            originText.innerText = `${parsedTemps.res_temp}°C`;
        } else {
            originText.innerText = '온도'
        }
    }
    if (originText.id === 'temp-max') {
        if (originText.innerText === '최고 온도') {
            originText.innerText = `${parsedTemps.res_temp_max}°C`;
        } else {
            originText.innerText = '최고 온도'
        }
    }
    if (originText.id === 'temp-min') {
        if (originText.innerText === '최저 온도') {
            originText.innerText = `${parsedTemps.res_temp_min}°C`;
        } else {
            originText.innerText = '최저 온도'
        }
    }
    if (originText.id === 'temp-feel') {
        if (originText.innerText === '체감 온도') {
            originText.innerText = `${parsedTemps.res_temp_feel}°C`;
        } else {
            originText.innerText = '체감 온도'
        }
    }
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("Can not Access Geo Location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude); // 경도와 위도
    }
}


function init() {
    loadCoords();
    temp.addEventListener('click', showTemps)
    tempMax.addEventListener('click', showTemps)
    tempMin.addEventListener('click', showTemps)
    tempFeel.addEventListener('click', showTemps)
}

init();