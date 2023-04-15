#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token not provided');
        return;
    }

    try {
        await saveKeyValue('token', token);
        printSuccess('Token saved');
    } catch (error) {
        printError(error.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('City not provided');
        return;
    }

    try {
        await saveKeyValue('city', city);
        printSuccess('City saved');
    } catch (error) {
        printError(error.message);
    }
};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('Invalid city');
        } else if (error?.response?.status == 401) {
            printError('Invalid token');
        } else {
            printError(error.message);
        }
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    return getForcast();
};

initCLI();
