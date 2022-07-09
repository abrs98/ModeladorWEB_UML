const STATUS = require('http-status');

// eslint-disable-line no-unused-vars
module.exports = (err, req, res, next, logger, config) => {
  logger.error({ message: err });

  if (err.status === STATUS.UNAUTHORIZED) {
    return res.status(STATUS.UNAUTHORIZED).json(err);
  }

  const response = Object.assign(
    {
      type: 'InternalServerError',
    },
    config.env === 'development' && {
      message: err.message,
      stack: err.stack,
    }
  );

  res.status(STATUS.INTERNAL_SERVER_ERROR).json(response);
};
