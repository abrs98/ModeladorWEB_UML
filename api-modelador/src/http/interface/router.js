const cors = require('cors');
const express = require('express');
const statusMonitor = require('express-status-monitor');
const { Router } = require('express');
const { partialRight } = require('ramda');
const controller = require('../../shared/interface/create-controller');
const { checkJwt } = require('../../shared/interface/jwt');
const errorHandler = require('./middlewares/error-handler');
const httpLogger = require('../infrastructure/logging/logger-http');

module.exports = ({ config, logger }) => {
  const router = Router();

  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  if (config.env !== 'test') {
    router.use(httpLogger({ logger }));
  }

  const apiRouter = Router();

  apiRouter
    .use(cors(config.cors))
    .use(express.json())
    .use(express.urlencoded({ extended: false }));

  /*checkJwt(config),*/
  apiRouter.use('/', controller('index'));
  apiRouter.use('/diagrama/status', controller('diagram').router);
  apiRouter.use('/template/', controller('tdiagram').router);
  apiRouter.use('/user/', controller('user').router);
  apiRouter.use('/project/', controller('project').router);

  router.use(`/api/${config.version}`, apiRouter);

  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};
