import pgp from 'pg-promise'

import env from '../config/env'

const db = pgp()(env.db.pgConnectionString);

export default db;
