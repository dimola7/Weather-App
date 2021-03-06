const cityForm = document.querySelector("form");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
// const loader = document.querySelector(".loader");

const updateUI = (data) => {
  const { cityDets, DailyForecasts } = data;

  //   let loader = `<div class="loader"></div>`;
  //   loader.innerHTML = loader;
  //   loader.removeAttribute("hidden");
  DailyForecasts.forEach((DailyForecast) => {
    let day = new Date(DailyForecast.Date);
    day = day.toString().slice(0, 15);
    let toCelsius = ((DailyForecast.Temperature.Maximum.Value - 32) * 5) / 9;
    toCelsius = Math.round(toCelsius);
    // let iconSrc = `img/icons/${DailyForecast.Day.Icon}.svg`;
    // icon.setAttribute("src", iconSrc);

    const html = `
      <div class="weather-card">
        <p class="weather-card-time text">${day}</p>
        <div class="weather-card-img-container">
          <img
            class="weather-card-img"
            src="img/day.svg"
            alt="image"
          />
        </div>
        <div class="icon">
            <img src="img/icons/1.svg" alt="">
          </div>
        <div class="text">
        <h3 class="weather-card-location">${cityDets.EnglishName}</h3>
        <p class="weather-card-weather">${DailyForecast.Day.IconPhrase}</p>
        <div class="weather-card-temperature">
            <span>${toCelsius}</span>
            <span>&deg;C</span>
        </div>
        </div>
        `;
    weather.innerHTML += html;
  });

  //update the night and day, and icon images

  //   let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  //   time.setAttribute("src", timeSrc);

  //remove the missing class if present
  if (weather.classList.contains("missing")) {
    weather.classList.remove("missing");
  }
  //   if (loader.classList.contains("missing")) {
  //     loader.classList.remove("missing");
  //   }
};

// const loading = () => {
//     loader.removeAttribute("hidden");
// }

const updateCity = async (city, data) => {
  const cityDets = await getCity(city);
  const DailyForecasts = await getWeather(cityDets.Key);

  console.log(DailyForecasts);
  return {
    cityDets,
    DailyForecasts,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    // .then(loader.setAttribute("hidden", ""))
    .then((data) => updateUI(data))
    .then((weather.innerHTML = ""))
    .catch((err) => console.log(err));

  // set localStorage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
