
async function getWeatherInfoForCity(city, weatherDAO) {
    return await weatherDAO.findWeatherInfoByCity(city)
}


export { getWeatherInfoForCity }
