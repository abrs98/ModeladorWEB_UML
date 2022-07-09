const fs = require('fs');
const { format } = require('winston');
const { combine, timestamp, label } = format;

const color = new Map([
  ['error', '\x1b[31m'],
  ['warn', '\x1b[33m'],
  ['info', '\x1b[36m'],
  ['http', '\x1b[31m'],
  ['verbose', '\x1b[31m'],
  ['debug', '\x1b[31m'],
  ['silly', '\x1b[31m'],
]);

const checkAndCreateLogDir = () => {
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
};

const customDisplay = format.printf(({ level, message, label, timestamp }) => {
  return `${new Date(timestamp).toLocaleTimeString()} [${label}] ${
    color.get(level) || ''
  }${level.toUpperCase()} - ${message}`;
});

const consoleFormat = () => {
  return combine(label({ label: 'Core' }), timestamp(), customDisplay);
};

const loggerFormatProduction = () => {
  return combine(timestamp(), format.json());
};

module.exports = {
  checkAndCreateLogDir,
  consoleFormat,
  loggerFormatProduction,
};
