/* eslint-disable no-undef */
const swaggerJSDoc = require('swagger-jsdoc');
const STATUS = require('http-status');
const { Router } = require('express');

module.exports = () => {
  const router = Router();

  const swaggerDefinition = {
    info: {
      title: 'Modelador UML API Explorer',
      version: '1.0.0',
      description: 'Available REST Endpoints of Modelador UML RESTful API',
    },
    host: `${process.env.API_SWAGGER}:${process.env.PORT}/api/${process.env.APP_VERSION}`,
    basePath: '/',
  };

  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['src/diagrams/interface/module/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  /**
   * @swagger
   * responses:
   *   Unauthorized:
   *     description: Unauthorized
   *   BadRequest:
   *     description: BadRequest / Invalid Input
   */

  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Status
   *     description: Returns API status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: API Status
   */
  router.get('/', (req, res) => {
    res.status(STATUS.OK).json({ status: 'API working' });
  });

  /*router.get('/swagger.json', (req, res) => {
    res.status(STATUS.OK).json(swaggerSpec);
  });*/

  return router;
};
