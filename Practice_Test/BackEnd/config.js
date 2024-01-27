const createDatabaseConnection = require('./database');
const config = require('./config');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Cria uma conexão com o banco de dados
const db = createDatabaseConnection(dbConfig);


