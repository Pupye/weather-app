CREATE MATERIALIZED VIEW IF NOT EXISTS week_weather_materialized_view 
    AS 
        SELECT 
            c.city_name AS city_name,
            w.temp AS temperature,
            w.probe_time AS probe_time
        FROM 
            city c JOIN weather w ON ((c.id = w.city_id))
        WHERE 
            date_trunc('week', now()) <= w.probe_time AND
            w.probe_time < date_trunc('week', now()) + '1 week'::interval;

