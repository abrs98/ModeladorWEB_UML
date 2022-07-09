const container = require('../../../container');
const router = require('./router');
const instance = require('./instance');

module.exports = () => {
  const {
    logger,
    response: { ok, fail },
  } = container.cradle;
  const app = instance();

  return {
    app,
    router: router({ logger, response: { ok, fail }, ...app }),
  };
};
