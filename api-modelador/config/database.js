/* eslint-disable no-undef */
try {
  require('dotenv').config(); // necesary due to migration in sequelize
} catch (err) { }

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'admin_robix',
    password: process.env.DB_PASSWORD || 'admin123456',
    database: process.env.DATABASE || 'modelador_robix',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || 'admin_robix',
    password: process.env.DB_PASSWORD || 'admin123456',
    database: process.env.DATABASE || 'modelador_robix',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
