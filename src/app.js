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
time.innerHTML = `${hour}:${minute}`;

let secondDay = document.querySelector("#day2");
secondDay.innerHTML = days[now.getDay() + 1];

let thirdDay = document.querySelector("#day3");
thirdDay.innerHTML = days[now.getDay() + 2];

let forthDay = document.querySelector("#day4");
forthDay.innerHTML = days[now.getDay() + 3];

let fifthDay = document.querySelector("#day5");
fifthDay.innerHTML = days[now.getDay() + 4];

let sixthDay = document.querySelector("#day6");
sixthDay.innerHTML = days[now.getDay() + 5];

let seventhDay = document.querySelector("#day7");
seventhDay.innerHTML = days[now.getDay() + 6];

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
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = ` humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
