import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`
            ${chalk.bgCyan(' HELP ')}
            Without parameters - display weather
            -s [CITY] Save city
            -h Display Display help
            -t [API_KEY] Save token
        `
    );
};

const printWeather = (res) => {
    const icon = getIcon(res.weather[0].icon);

    console.log(
        dedent`
            ${chalk.bgCyan(' WEATHER ')} in ${res.name}:

            ${icon}  ${res.weather[0].description}
            Temperature - ${Math.ceil(res.main.temp)}°C
            Feels like - ${Math.ceil(res.main.feels_like)}°C
            Wind - ${Math.ceil(res.wind.speed)}km/h
            Visibility - ${Math.ceil(res.visibility / 1000)}km
        `
    );
};

export { printError, printSuccess, printHelp, printWeather };
