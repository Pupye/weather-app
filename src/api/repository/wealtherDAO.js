import db from '../config/db'


async function findWeatherInfoByCity(cityName) {
    try {
        const users = await db.any('SELECT * FROM week_weather_materialized_view');
        // success
        console.log(users)
    }
    catch (error) {
        console.log(error)
    }
    return {
        "city": cityName,
        "today": 24,
        "yesterday": 23,
        "week-average": 22
    };
}

export default {
    findWeatherInfoByCity
}
