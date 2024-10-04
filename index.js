/*Väder API med sökfunktion i hela världen*/
const apiKey = "9bc82d6dbae467b3c6fdb0744a447dcd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weatherIcon');

async function checkWeather(city) {
    const fetchUrl = apiUrl + city + `&appid=${apiKey}`;
    const response = await fetch(fetchUrl);
    var data = await response.json();

    console.log(data);

    document.querySelector('.currentLoc').innerHTML = data.name;
    document.querySelector('.currentTemp').innerHTML = Math.round(data.main.temp) + "°C";

    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = "bilder/cloud (kopia).png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "bilder/sunny (kopia).png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "bilder/rain_cloud.png";
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "bilder/snow_cloud.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "bilder/mist icon.png";
    }

    document.querySelector('.weather').style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})
/*Väder API med sökfunktion i hela världen*/




/*geolocation, nuvarande väder för nuvarande plats*/
const apiLocation = "http://api.openweathermap.org/geo/1.0/reverse?";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
var loc = navigator.geolocation;

loc.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const lim = 1;
    const gotUrl = apiLocation + `lat=${lat}&lon=${lon}&limit=${lim}&appid=${apiKey}`;

    let cityName;

    fetch(gotUrl)
        .then(response => response.json())
        .then(geoData => {

            cityName = geoData[0].name;
            console.log(cityName);

            const weatherInfo = `${geoApiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            return fetch(weatherInfo);
        })
        .then(response => response.json())
        .then(weatherData => {

            const temp = weatherData.main.temp;
            document.querySelector('.currentLoc').innerText = cityName;
            document.querySelector('.currentTemp').innerText = Math.round(temp) + "°C";

            if (weatherData.weather[0].main == 'Clouds') {
                weatherIcon.src = "bilder/cloud (kopia).png";
            }
            else if (weatherData.weather[0].main == "Clear") {
                weatherIcon.src = "bilder/sunny (kopia).png";
            }
            else if (weatherData.weather[0].main == "Rain") {
                weatherIcon.src = "bilder/rain_cloud.png";
            }
            else if (weatherData.weather[0].main == "Snow") {
                weatherIcon.src = "bilder/snow_cloud.png";
            }
            else if (weatherData.weather[0].main == "Mist") {
                weatherIcon.src = "bilder/mist icon.png";
            }

            document.querySelector('.autoLocation').style.display = 'block';
        });
},
    (error) => {
        console.log("Error getting geolocation: ", error.message);
    }
);
/*geolocation, nuvarande väder för nuvarande plats*/




/* Tid och datum*/
const currentDate = {
    date: new Date(),
    time: new Date()
};

let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = new Date();
let dayOfWeek = weekDay[day.getDay()];

document.querySelector('.currentDay').innerHTML = dayOfWeek;
document.querySelector('.currentTime').innerHTML = currentDate.time.toLocaleTimeString();
/* Tid och datum*/
