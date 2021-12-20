//Current Time

function getDate() {
  let currentDate = new Date();
  let now = currentDate.getDate();
  let date = document.querySelector("#date");
  let hour = document.querySelector("#hour");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  hour.innerHTML = `${hours}:${minutes} IS YOUR LOCAL TIME`;
  date.innerHTML = `${day}, ${month} ${now} ${year}`;
}
getDate();

function showDayTemperature(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecastForWeek(coordinates) {
  let apiKey = "c089bdb5f7d0e706e5fbd9cda99f77bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showTemperature(response) {
  let city = (document.querySelector("#display-city").innerHTML =
    response.data.name);
  let description = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${description} in ${city}`;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#humidity").innerHTML = `Humidity ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind ${Math.round(
    response.data.wind.speed
  )} km/h`;

  celsiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecastForWeek(response.data.coord);
}
function searchCity(city) {
  let apiKey = "c089bdb5f7d0e706e5fbd9cda99f77bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class = "col-2">
            <div class = "weather-forecast-day" id = "day">${showDayTemperature(
              forecastDay.dt
            )}</div>
            <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          id="icon"/
          width = "42">
            <span class = "weather-max-temperature"> ${Math.round(
              forecastDay.temp.max
            )}º /</span>
            <span class = "weather-min-temperature">${Math.round(
              forecastDay.temp.min
            )}º</span>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchForCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;

  searchCity(city);
}

function searchActualLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c089bdb5f7d0e706e5fbd9cda99f77bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let currentLocation = document.querySelector("#display-city");
  currentLocation.innerHTML = apiUrl;
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchActualLocation);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let form = document.querySelector("#type-city");
form.addEventListener("submit", searchForCityWeather);

//let searchBtn = document.querySelector("#search-location-button");
//searchBtn.addEventListener("click", searchForCityWeather);
let currentBtn = document.querySelector("#current-location-button");
currentBtn.addEventListener("click", showCurrentLocation);

let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

searchCity("Madrid");
