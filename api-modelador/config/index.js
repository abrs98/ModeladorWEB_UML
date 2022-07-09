/* eslint-disable no-undef */
try {
  require('dotenv').config();
} catch (err) {}

const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

const loadDbConfig = () => {
  try {
    return require('./database')[ENV];
  } catch (error) {
    throw new Error('Database is configuration is required');
  }
};

const envConfig = require(path.join(__dirname, 'environments', ENV));
const corsConfig = require('./cors');
const dbConfig = loadDbConfig();
const authConfig = require('./auth');
const config = Object.assign(
  {
    env: ENV,
    cors: corsConfig,
    db: dbConfig,
    auth: authConfig,
  },
  envConfig
);

module.exports = config;
