javascript
const api = {
  key: "6342105c8dab967b3b3f866ead812c78",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      alert(error);
    });
}

function displayResults(weather) {
  const city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${
    weather.weather[0].icon
  }@2x.png" />`;

  const temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const desc = document.querySelector(".desc");
  desc.innerText = weather.weather[0].description;
}