import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const API_WEATHER_URI =
  "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

const getWeather = async () => {
  const token =
    process.env?.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  if (!token)
    throw new Error("API key didn't set. Set it using comand -t [API_KEY]");

  const city = process.env?.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("lang", "ua");
  url.searchParams.append("units", "metric");

  const response = await fetch(url.href);
  if (response.ok) return response.json();
  return Promise.reject(response);
};

export { getWeather };
