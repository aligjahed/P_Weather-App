// importing anime.js library
import anime from "../../node_modules/animejs/lib/anime.es.js";

// Html calls
const cityInput = document.querySelector(".cityInput");
const waitText = document.querySelector(".waitText");
const dataTab = document.querySelector(".data");
const container = document.querySelector(".bg");
const intro = document.querySelector(".intro");
const bgEl = document.querySelector(".bgEl");
const name = document.getElementById("name");

// Variables & Constants
const latApiAddress = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?";
const weatherApiKey = "&APPID=b09b4322a8477f712bb774a70f927f69";
const iconApi = "https://openweathermap.org/img/wn/";
let lat = "";
let lon = "";
let data = "";
let userCity = "";

const date = new Date();
const dateHour = date.getHours();
const dateFormat = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = date.toLocaleDateString("en-US", dateFormat);

// Intro Fade in & out
const Fadein = (req) => {
  anime({
    targets: req,
    scale: [0.7, 1],
    opacity: [0, 1],
    easing: "linear",
    duration: 500,
  });
};

const Fadeout = (req) => {
  anime({
    targets: req,
    scale: [1, 0.7],
    opacity: [1, 0],
    visibility: "hidden",
    easing: "linear",
    duration: 500,
  });

  sleep(1000);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

name.addEventListener("click", () => {
  document.location.reload(true);
});

// Fade intro at page load
window.onload = () => {
  Fadein(".intro");

  if (dateHour < 12) {
    container.style.backgroundImage =
      "linear-gradient(135deg , #13293d , #16324f";
  } else {
    container.style.backgroundImage =
      "linear-gradient(315deg  , #7DA6D2 , #9DC7EF";
  }
};

// Get input field data and set it as city on pressing Enter key
cityInput.addEventListener("keyup", (el) => {
  waitText.style.display = "none";
  waitText.textContent = "Please wait...";
  waitText.style.color = "white";
  cityInput.style.borderColor = "white";

  if (el.keyCode == "13") {
    userCity = cityInput.value;

    waitText.style.display = "block";
    getData(userCity);
  }
});

// Get data from weather API
const getData = async (req) => {
  const latRes = await fetch(latApiAddress + req + weatherApiKey);
  if (latRes.status == 200) {
    const latData = await latRes.json();
    lat = latData.coord.lat;
    lon = latData.coord.lon;
    userCity = latData.name;

    const res = await fetch(
      weatherApiUrl + "lat=" + lat + "&lon=" + lon + weatherApiKey
    );
    data = await res.json();

    waitText.style.display = "none";
    Fadeout(".intro");
    intro.classList.add("display-none");

    showData(data.daily, data.current);
    dataTab.classList.remove("display-none");
    Fadein(".data");
  } else {
    waitText.textContent = "City not found, Try again.";
    waitText.style.color = "red";
    cityInput.style.borderColor = "red";
  }
};

const showData = (req, current) => {
  const htmlString = `
  <h2 class="cityName">${userCity}</h2>
  <h3 class="date">${today}</h3>
  <div class="data__current flex flex-jc-se flex-ai-c">
    <div class="data__current-left">
      <img src=${
        iconApi + current.weather[0].icon.substring(0, 2) + "d@4x.png"
      } alt="current temp" />
      <h2>${current.weather[0].description}</h2>
    </div>
    <div class="data__current-right">
      <h2>${Math.round(parseInt(current.temp) - 273)}°</h2>
    </div>
    </div>
    <hr>
    <div class="data__daily flex flex-jc-sb flex-ai-c">
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>SUN</h2>
      <img src=${
        iconApi + req[0].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[0].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column ">
        <h2>MON</h2>
      <img src=${
        iconApi + req[1].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[1].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>TUE</h2>
      <img src=${
        iconApi + req[2].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[2].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>WED</h2>
      <img src=${
        iconApi + req[3].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[3].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>THU</h2>
      <img src=${
        iconApi + req[4].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[4].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>FRI</h2>
      <img src=${
        iconApi + req[5].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[5].temp.day) - 273)}°</h2>
      </div>
      <div class="daily__box flex flex-jc-c flex-ai-c flex-column">
        <h2>SAT</h2>
      <img src=${
        iconApi + req[6].weather[0].icon.substring(0, 2) + "d@2x.png"
      } alt="daily temp" />
        <h2>${Math.round(parseInt(req[6].temp.day) - 273)}°</h2>
      </div>
  </div>

  `;
  dataTab.innerHTML = htmlString;
};
