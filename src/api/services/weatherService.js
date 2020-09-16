import NoRecordsFoundError from '../errors/NoRecordsError';

async function getWeatherInfoForCity(city, weatherDAO) {
    const info = await weatherDAO.findWeatherInfoByCity(city);
    if (!info) {
        throw new NoRecordsFoundError('no records found for city');
    }
    //converting string to int
    info["today"] = parseInt(info["today"], 10);
    info["yesterday"] = parseInt(info["yesterday"], 10);
    info["week-average"] = parseInt(info["week-average"], 10);
    return info;
}


export { getWeatherInfoForCity };
