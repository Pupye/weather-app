import pgp from 'pg-promise'

const db = pgp()('postgres://postgres:changeme@localhost:5432/dev_db');

export default db;
