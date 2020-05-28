const cityForm = document.querySelector("form");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDets, DailyForecasts } = data;

  DailyForecasts.forEach((DailyForecast) => {
    let day = new Date(DailyForecast.Date);
    day = day.toString().slice(0, 15);
    let toCelsius = ((DailyForecast.Temperature.Maximum.Value - 32) * 5) / 9;
    toCelsius = Math.round(toCelsius);

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
  //   const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  //   icon.setAttribute("src", iconSrc);

  //   let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  //   time.setAttribute("src", timeSrc);

  //remove the d-none class if present
  if (weather.classList.contains("d-none")) {
    weather.classList.remove("d-none");
  }
};

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
    .then((data) => updateUI(data))
    .then((weather.innerHTML = ""))
    .catch((err) => console.log(err));
});
