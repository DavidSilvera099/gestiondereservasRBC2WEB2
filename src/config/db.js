import {createPool} from 'mysql2/promise.js';
import config from './config.js';

export const pool = createPool({
    host: config.DB.HOST,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    database: config.DB.NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

