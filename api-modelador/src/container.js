const {
  createContainer,
  asFunction,
  asValue,
  InjectionMode,
} = require('awilix');

const app = require('./http/application');
const server = require('./http/interface/server');
const router = require('./http/interface/router');
const config = require('../config');
const logger = require('./http/infrastructure/logging/logger');
const database = require('./http/infrastructure/database');
const response = require('./http/infrastructure/support/response');
const repository = require('./http/infrastructure/repositories');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  app: asFunction(app).singleton(),
  server: asFunction(server).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
  response: asFunction(response).singleton(),
  config: asValue(config),
  repository: asFunction(repository).singleton(),
});

module.exports = container;
