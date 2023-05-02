import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { getWeather } from './services/api.service';

dotenv.config();

const app = express();
const port = process.env.PORT;
const DEFAULT_CITY = 'moscow';

app.get('/weather', async (req: Request, res: Response) => {
    const city = (req.query?.city as string) ?? DEFAULT_CITY;
    const weather = await getWeather(city);
    res.json(weather);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
