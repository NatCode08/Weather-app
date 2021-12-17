//Current Time

function getDate() {
  let currentDate = new Date();
  let h1 = document.querySelector("#date");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  h1.innerHTML = `${day}, ${hours}:${minutes}`;
}
getDate();

function showTemperature(response) {
  console.log(response);
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#max-temp").innerHTML = `Max ${Math.round(
    response.data.main.temp_max
  )}ºC  / `;
  document.querySelector("#min-temp").innerHTML = `Min ${Math.round(
    response.data.main.temp_min
  )}ºC`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showWeatherForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
            <strong>Tue</strong>
            <img
          src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
          alt="clear"
          id="icon"
        />
            <div>9º / 3º</div>
          </div>
        </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "c089bdb5f7d0e706e5fbd9cda99f77bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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

//let form = document.querySelector("#search-text-input");
//form.addEventListener("submit",);

let searchBtn = document.querySelector("#search-location-button");
searchBtn.addEventListener("click", searchForCityWeather);
let currentBtn = document.querySelector("#current-location-button");
currentBtn.addEventListener("click", showCurrentLocation);

let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

searchCity("Madrid");
showWeatherForecast();
