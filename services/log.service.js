import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};
const printSuccess = (msg) => {
  console.log(chalk.bgGreen(" Success ") + " " + msg);
};

const printhelp = () => {
  console.log(
    dedent(`
      ${chalk.bgYellow(" HELP ")} Without params
      -s [CITY] for city
      -h forprint help
      -t [API_KEY] for saving  token 
    `)
  );
};

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "âī¸";
    case "02":
      return "đ¤ī¸";
    case "03":
      return "âī¸";
    case "04":
      return "âī¸";
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
};

const printWeather = (res) => {
  console.log(
    dedent(`
      ${chalk.bgMagenta(" WEATHER ")} Weather in the city ${res.name}
      ${getIcon(res.weather?.[0].icon) ?? "-"}  ${res.weather[0].description}
      Temperature ${res.main.temp} (feelike ${res.main.feels_like})
      Humidity ${res.main.humidity}
      Wind speed ${res.wind.speed}
    `)
  );
};

export { printError, printSuccess, printhelp, printWeather };
