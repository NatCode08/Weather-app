let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
let city = prompt("Enter a city").toLowerCase();
if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let ctemp = Math.round(temperature);
  let ftemp = Math.round((temperature * 9) / 5 + 32);
  let humidity = weather[city].humidity;

  alert(
    `It is current ${ctemp}ºC (${ftemp}ºF) in ${city} with a humidity of ${humidity}`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

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
  let minutes = currentDate.getMinutes();
  h1.innerHTML = `${day}, ${hours}:${minutes}`;
}
getDate();

// Search engine
function searchForCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-text-input");
  let h2 = document.querySelector("#display-city");
  h2.innerHTML = `${searchCity.value}`;
}
let form = document.querySelector("#type-city");
form.addEventListener("submit", searchForCity);

//ºF/ºC

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 6;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 42;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

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
