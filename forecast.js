const key = "zdUjbJJWdR2PM9nUdTHWe3mjloP2q1SH";

//get city information
const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get information for 5 days
const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  const { DailyForecasts } = data;
  return DailyForecasts;
};
