import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (error) {
        return false;
    }
};

const getKeyValue = async (key) => {
    if (isExist(filePath)) {
        const file = await promises.readFile(filePath);
        return JSON.parse(file)[key];
    }

    return undefined;
};

const saveKeyValue = async (key, value) => {
    let data = {};

    if (isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export { getKeyValue, saveKeyValue, TOKEN_DICTIONARY };
