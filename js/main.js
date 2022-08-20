//Today's Card Variables:
let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("location"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  description = document.getElementById("today-description"),
  humidity = document.getElementById("humidity"),
  wind = document.getElementById("winds"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("searchBar"),
  response,
  responseData,
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ];

//Next Days Variables:
let nextDay = document.querySelectorAll(".nextDay"),
  nextDayIcon = document.querySelectorAll(".nextDay-icon"),
  maxDegree = document.querySelectorAll(".max-degree"),
  minDegree = document.querySelectorAll(".min-degree "),
  nextDayDescription = document.querySelectorAll(".nextDay-description");

let spinner = document.getElementsByClassName("spinner-grow");
let datailsContant = document.getElementsByClassName("temp-datails-contant");
console.log(datailsContant);
async function getWeatherData(city = "cairo") {
  response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=381fc2f05e2143b8a4f91816222106&q=${city.toLocaleLowerCase()}&days=3&aqi=no&alerts=no`
  );
  responseData = await response.json();

  displayTodayWeather();
  displayNextDayWeather();
  if (response == undefined) {
    for (let i = 0; i < spinner.length; i++) {
      spinner[i].classList.add("d-block");
    }
  } else {
    for (let i = 0; i < spinner.length; i++) {
      spinner[i].classList.add("d-none");
    }
  }
}
getWeatherData();

function displayTodayWeather() {
  let date = new Date();
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()}  ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responseData.location.name;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute("src", `http:${responseData.current.condition.icon}`);
  description.innerHTML = responseData.current.condition.text;
  humidity.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
}
function displayNextDayWeather() {
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML =
      days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute(
      "src",
      `http:${responseData.forecast.forecastday[i + 1].day.condition.icon}`
    );

    maxDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.condition.text;
  }
}

searchBar.addEventListener("keyup", function () {
  let currentCity = searchBar.value.toLocaleLowerCase();
  getWeatherData(currentCity);
  if (searchBar.value == "") {
    getWeatherData("cairo");
  }
});

let emailInput = document.getElementById("emailInput");
let emailInputAlert = document.querySelector(".email-input-alert");
let subscribeBtn = document.getElementById("subscribeBtn");

function validateEmail() {
  let regex = /@[A-Za-z]{5,10}(\.com)$/;
  console.log(emailInput.value);
  if (regex.test(emailInput.value) != true) {
    emailInput.classList.add("is-invalid");
    emailInputAlert.classList.add("d-block");
    emailInputAlert.classList.remove("d-none");
    subscribeBtn.disabled = true;
    console.log("000");
    return false;
  } else {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    emailInputAlert.classList.add("d-none");
    emailInputAlert.classList.remove("d-block");
    subscribeBtn.disabled = false;
    console.log("111");
    return true;
  }
}
emailInput.addEventListener("keyup", validateEmail);

subscribeBtn.addEventListener("click", function () {
  if (validateEmail() == true) {
    subscribeBtn.style.display = "flex";
  } else {
    subscribeBtn.disabled = true;
  }
});
