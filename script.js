const api = {
    key: "c2a812f3d5c7294b4331976708bd95b7",
    base: "https://api.openweathermap.org/data/2.5/"
};
let now = new Date();
let date = document.querySelector(".date");
date.innerText = dateBuilder(now);

getResults("agra");
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}
let el = document.getElementById("panel");
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

    const code = weather.weather[0].id;
    switch (true) {
        case code >= 200 && code <= 232:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/lighting.jpeg')";
            break;
        case code >= 300 && code <= 321:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/drizzle.jpeg')";
            break;
        case code >= 500 && code <= 531:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/rain.jpeg')";
            break;
        case code >= 600 && code <= 622:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/snow.jpeg')";
            break;
        case code >= 701 && code <= 781:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/mist.jpeg')";
            break;
        case code >= 801 && code <= 804:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/rainclouds.jpeg')";
            break;
        case code === 800:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/shiningsun.jpeg')";
            break;
        default:
            document.getElementsByTagName("main")[0].style.backgroundImage = "url('src/images/bluesky.avif')";
            break;
    }
}

function dateBuilder(d) {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
document.addEventListener('DOMContentLoaded', function () {
    // Function to update the time
    function updateTime() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
  
      // Format the time as HH:MM:SS
      var formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      // Update the content of the element with the current time
      document.getElementById('current-time').innerText = formattedTime;
    }
  
    // Update the time initially
    updateTime();
  
    // Update the time every second (1000 milliseconds)
    setInterval(updateTime, 1000);
  });
  