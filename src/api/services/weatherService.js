import NoRecordsFoundError from '../errors/NoRecordsError';

async function getWeatherInfoForCity(city, weatherDAO) {
    const info = await weatherDAO.findWeatherInfoByCity(city);
    if (!info) {
        throw new NoRecordsFoundError('no records found for city');
    }
    return info;
}


export { getWeatherInfoForCity };
