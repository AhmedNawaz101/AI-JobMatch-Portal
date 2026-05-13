const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'job_recommendation',
    process.env.DB_USER || 'job_userr',  // Corrected username with two 'r's
    process.env.DB_PASSWORD || '0000',    // Corrected password
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: console.log, // Enable logging for debugging
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Error connecting to PostgreSQL:', err));
    
sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err));

module.exports = sequelize;
