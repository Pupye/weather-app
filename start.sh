#!/bin/bash
docker-compose up -d
sleep 3 #setup
./node_modules/db-migrate/bin/db-migrate db:create  dev_db
./node_modules/db-migrate/bin/db-migrate up
./node_modules/db-migrate/bin/db-migrate up:seed
npm start
