/* eslint-disable no-undef */
module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  timezone: process.env.TIMEZONE,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: true,
  },
  authSecret: process.env.SECRET,
  authSession: {
    session: false,
  },
  swagger: {
    swaggerDefinition: {
      info: {
        title: 'Modelador UML API Explorer',
        version: '1.0.0',
        description: 'Available REST Endpoints of Modelador UML RESTful API',
      },
      host: `${process.env.API_SWAGGER}:${process.env.PORT}/api/${process.env.APP_VERSION}`,
      basePath: '/',
      securityDefinitions: {
        JWT: {
          description: '',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  apis: ['src/interfaces/http/modules/**/*.js'],
};
