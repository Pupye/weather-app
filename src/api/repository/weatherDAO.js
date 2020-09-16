import db from '../config/db'

const findWeatherInfoByCityQuery = `
SELECT
    city_today.t AS today,
    city_avg.t AS average,
    city_yesterday.t AS yesterday 
FROM
(
  SELECT city_name 
  FROM week_weather_materialized_view 
  WHERE LOWER(city_name) = LOWER($1)
  limit 1
) AS city LEFT JOIN
(
   SELECT city_name, AVG(temperature)::numeric(10) AS t
   FROM week_weather_materialized_view
   GROUP BY city_name
) AS city_avg ON city.city_name = city_avg.city_name LEFT JOIN
(
    SELECT city_name, AVG(temperature)::numeric(10) AS t
    FROM week_weather_materialized_view
    WHERE DATE_TRUNC('day', now()) <= probe_time
    AND probe_time < DATE_TRUNC('day', now()) + '1 day'::interval
    GROUP BY city_name
) AS city_today ON city.city_name = city_today.city_name LEFT JOIN
(
   SELECT city_name, AVG(temperature)::numeric(10) AS t
   FROM week_weather_materialized_view 
   WHERE DATE_TRUNC('day', now()) - '1 day'::interval <= probe_time
   AND probe_time < DATE_TRUNC('day', now())
   GROUP BY city_name
) AS city_yesterday ON city.city_name = city_yesterday.city_name;`

async function findWeatherInfoByCity(cityName) {
    return await db.oneOrNone(findWeatherInfoByCityQuery, [cityName]);
}
const refreshWeekWeatherMaterializedViewQuery = `
REFRESH MATERIALIZED VIEW week_weather_materialized_view; 
`
async function refreshWeekWeatherMaterializedView() {
    return await db.none(refreshWeekWeatherMaterializedViewQuery)
}

export default {
    findWeatherInfoByCity,
    refreshWeekWeatherMaterializedView
}
