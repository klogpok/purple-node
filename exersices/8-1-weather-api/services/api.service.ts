import axios from 'axios';

interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    description: string;
    feelLikes: number;
    wind: number;
    visibility: number;
}

interface ErrorResponseData {
    cod: string;
    message: string;
}

const getWeather = async (city: string): Promise<WeatherData | ErrorResponseData> => {
    if (!city || typeof city !== 'string') {
        throw new Error('City name must be a non-empty string');
    }

    const token = process.env.WEATHER_TOKEN;

    if (!token) {
        throw new Error('API token not exists');
    }

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                units: 'metric',
            },
        });

        const weatherData: WeatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather.description,
            feelLikes: response.data.main.feel_like,
            wind: response.data.wind.speed,
            visibility: response.data.visibility,
        };

        return weatherData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }
};

export { getWeather };
