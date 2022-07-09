/* eslint-disable no-undef */
const STATUS = require('http-status');
const { Router } = require('express');

const SERVICE_NAME = 'userRouter';
const DEVELOPMENT = 'development';

module.exports = ({ useCase, logger, response: { ok, fail } }) => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        if (process.env.NODE_ENV === DEVELOPMENT) {
          const { complete } = req.query;
          const data = await useCase.get.all({ options: { complete } });
          res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('No result available');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .post(async (req, res) => {
      try {
        const { name, email } = req.body;

        if (name && email) {
          const data = await useCase.post.create({
            name,
            email,
          });
          return res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete body');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .delete(async (_, res) => {
      try {
        if (process.env.NODE_ENV === DEVELOPMENT) {
          const deleted = await useCase.delete.all();
          if (deleted) return res.sendStatus(STATUS.NO_CONTENT);
          res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Impossible to remove');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    });

  router
    .route('/:email')
    .get(async (req, res) => {
      try {
        const { complete } = req.query;
        const { email } = req.params;

        if (email) {
          const data = await useCase.get.find({
            id: email,
            options: { complete },
          });
          return res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete params');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .put(async (req, res) => {
      try {
        const { email } = req.params;
        const { name } = req.body;

        if (name && email) {
          await useCase.put.update({ name, email });
          return res.sendStatus(STATUS.NO_CONTENT);
        } else {
          throw new Error('Incomplete params or/and body');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .delete(async (req, res) => {
      try {
        const { email } = req.params;

        if (email) {
          const isDeleted = await useCase.delete.remove({ id: email });
          if (isDeleted) return res.sendStatus(STATUS.NO_CONTENT);
          res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Incomplete params');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    });

  return router;
};
