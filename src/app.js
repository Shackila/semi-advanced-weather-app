let day = document.querySelector("#current-day");
now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day.innerHTML = days[now.getDay()];
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let time = document.querySelector("#current-time");
let hour = addZero(now.getHours());
let minute = addZero(now.getMinutes());

if (hour < 12) {
  let h1 = document.querySelector("#header");
  h1.innerHTML = "Good Morning!";
  time.innerHTML = `${hour}:${minute} AM`;
} else if (hour > 20) {
  let h1 = document.querySelector("#header");
  h1.innerHTML = "Good Evening!";
  document.getElementById("weather-app").style.background =
    "linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)";
  document.body.style.backgroundColor = "#dfe9f3";
  time.innerHTML = `${hour}:${minute} PM`;
} else {
  let h1 = document.querySelector("#header");
  h1.innerHTML = "Good Afternoon!";
  document.getElementById("weather-app").style.background =
    "linear-gradient(181deg, rgb(253, 219, 146) 0%, rgb(209, 253, 255) 67%)";
  time.innerHTML = `${hour}:${minute} PM`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-6">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index != 0) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col">
                <div class="card3">
                  <div class="card-body">
                    <h5 class="card-title" id="day">${formatDay(
                      forecastDay.dt
                    )}</h5>
                    <p class="card-text">
                        <img
                          src="http://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png"
                          alt=""
                          width="60"
                        />
                      <br />
                      <span class="max-temprature">${Math.round(
                        forecastDay.temp.max
                      )}° |  </span>
                      <span class="min-temprature"> ${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </p>
                  </div>
                </div>
              </div>  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "2fa6e56b10efce71f24cca911445a98c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}
function displayTemprature(response) {
  let cityElement = document.querySelector("#city-name");
  let tempratureElement = document.querySelector("#big-tempreture");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#main-icon");
  cityElement.innerHTML = response.data.name;
  celsiusTemprature = response.data.main.temp;
  tempratureElement.innerHTML = Math.round(celsiusTemprature);
  descriptionElement.innerHTML = `  ${response.data.weather[0].description}`;
  humidityElement.innerHTML = ` humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2fa6e56b10efce71f24cca911445a98c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemprature);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#big-tempreture");
  let FahrenheitTEmprature = (celsiusTemprature * 9) / 5 + 32;
  tempratureElement.innerHTML = Math.round(FahrenheitTEmprature);
}
function displayCelsius(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#big-tempreture");
  tempratureElement.innerHTML = Math.round(celsiusTemprature);
}
search("Tehran");

celsiusTemprature = null;

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsius);
