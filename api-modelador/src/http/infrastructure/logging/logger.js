const { createLogger, transports } = require('winston');
const { consoleFormat, loggerFormatProduction } = require('./logger-utils');

module.exports = ({ config }) => {
  const logger = createLogger({
    level: 'info',
    format: loggerFormatProduction(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new transports.File({
        ...config.logging,
        filename: `logs/error-${config.env}.log`,
        level: 'error',
      }),
      new transports.File({
        ...config.logging,
        filename: `logs/combined-${config.env}.log`,
      }),
    ],
  });

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: consoleFormat(),
      })
    );
  }

  return logger;
};
