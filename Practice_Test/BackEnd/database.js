require('dotenv').config();
const { Pool } = require('pg');

function createDatabaseConnection() {
    const DATABASE_URL = process.env.DATABASE_URL;
    return new Pool({
        connectionString: DATABASE_URL
    });
}

module.exports = createDatabaseConnection;
