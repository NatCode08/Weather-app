//Current Time

function getDate() {
  let currentDate = new Date();
  console.log(currentDate);
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

let searchBtn = document.querySelector("#search-location-button");
searchBtn.addEventListener("click", searchForCityWeather);
let currentBtn = document.querySelector("#current-location-button");
currentBtn.addEventListener("click", showCurrentLocation);
searchCity("Madrid");
