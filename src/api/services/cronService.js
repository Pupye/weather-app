import { CronJob } from 'cron';
import logger from '../config/logger';
import weatherDAO from '../repository/weatherDAO';

const refreshMaterializedViewsJob = new CronJob('00 00 00 * * *', async () => {
    try {
        logger.info("refreshing materialized views");
        await weatherDAO.refreshWeekWeatherMaterializedView();
    } catch (error) {
        logger.error(error.stack);
    }
})

async function startJobs() {
    refreshMaterializedViewsJob.start();
}

async function stopJobs() {
    refreshMaterializedViewsJob.stop();
}

export {
    startJobs,
    stopJobs
};
