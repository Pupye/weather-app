import express from 'express';
import morgan from 'morgan';
import logger from './api/config/logger';

import WeatherRoutes from './api/routes/weatherRoutes';
import { generalErrorHandler, NoRecordsFoundErrorHandler } from './api/errors/handlers';
import { startJobs } from './api/services/cronService'


async function startServer() {
    const app = express();
    //routes set up
    app.use(morgan('combined', { stream: logger.stream }));
    app.use(express.json());
    app.use('/api/weather', WeatherRoutes);
    app.get('/api/health/', (req, res) => { res.status(200).end() })

    //errors
    app.use(NoRecordsFoundErrorHandler)
    app.use(generalErrorHandler)

    //cron
    await startJobs()
    app.listen(8080, err => {
        if (err) {
            process.exit(1);
        }
        console.log("server was started");
    });
}

startServer();
