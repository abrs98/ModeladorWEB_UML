const express = require('express');

module.exports = ({ config, logger, router }) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(router);

  return {
    app,
    start: () =>
      new Promise(() => {
        const http = app.listen(config.port, () => {
          const { port } = http.address();
          logger.info({
            message: `App listening on ${port}`,
            service: 'server',
          });
        });
      }),
  };
};
