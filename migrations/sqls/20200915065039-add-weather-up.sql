CREATE TABLE IF NOT EXISTS weather (
    id SERIAL PRIMARY KEY,
    city_id INT NOT NULL,
    temp SMALLINT,
    probe_time TIMESTAMP,
    CONSTRAINT fk_city
      FOREIGN KEY(city_id) 
	    REFERENCES city(id)
);
