import { homedir } from "os";
import {
  join,
  // basename,
  // dirname,
  // extname,
  // relative,
  // isAbsolute,
  // resolve,
  // sep,
} from "path";

import { promises } from "fs";

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const filePath = join(homedir(), "weather-data.json");

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const saveKeyValue = async (key, value) => {
  // console.log(basename(filePath));
  // console.log(dirname(filePath));
  // console.log(extname(filePath));
  // console.log(relative(filePath, dirname(filePath)));
  // console.log(isAbsolute(filePath));
  // console.log(resolve(".."));
  // console.log(sep);

  let data = {};

  const hasFile = await isExist(filePath);
  if (hasFile) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  const hasFile = await isExist(filePath);
  if (hasFile) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
