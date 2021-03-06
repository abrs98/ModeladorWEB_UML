const { assoc } = require('ramda');

module.exports = ({ config }) => {
  const defaultResponse = (success = true) => {
    return {
      success,
      version: config.version,
      date: new Date(),
    };
  };

  const ok = (data) => {
    return assoc('data', data, defaultResponse(true));
  };

  const fail = (data) => {
    return assoc('error', data, defaultResponse(false));
  };

  return {
    ok,
    fail,
  };
};
