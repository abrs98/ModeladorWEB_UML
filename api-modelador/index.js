const container = require('./src/container');
const app = container.resolve('app');

app.start().catch((err) => {
  app.logger.error({ message: err.stack, service: 'entryPoint' });
  // eslint-disable-next-line no-undef
  process.exit();
});
