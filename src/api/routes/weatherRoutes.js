import { Router } from 'express';
import logger from '../config/logger';

import { getWeatherInfoForCity } from '../services/weatherService'
import weatherDAO from '../repository/wealtherDAO'
const router = Router();

router.get('/:city', async (req, res, next) => {
    const cityName = req.params.city;
    logger.info(`got the city named ${cityName}`);
    try {
        const weatherData = await getWeatherInfoForCity(cityName, weatherDAO);
        res.status(200).json(weatherData).end();
        next()
    } catch (error) {
        logger.error(error.stack)
        next(error)
    }
})


export default router;
