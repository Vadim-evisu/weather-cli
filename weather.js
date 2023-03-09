#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printhelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token didn't pass");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City didn't pass");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async (city) => {
  let res = null;
  try {
    res = await getWeather(city);
  } catch (e) {
    if (e?.status === 404) {
      printError("City not found");
    } else if (e?.status === 401) {
      printError(
        "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info"
      );
    } else {
      printError(e.message);
    }
  }
  if (!res) return;
  printWeather(res);
};

const initCLI = () => {
  // console.log(process.argv);
  const args = getArgs(process.argv);
  if (args.h) {
    // print helo
    return printhelp();
  }
  if (args.s) {
    // save city
    return saveCity(args.s);
  }
  if (args.t) {
    // save token
    return saveToken(args.t);
  }
  return getForecast();
  // return weather
};

initCLI();
