/* eslint-disable no-undef */
const STATUS = require('http-status');
const { Router } = require('express');

const SERVICE_NAME = 'tdiagramRouter';
const DEVELOPMENT = 'development';

module.exports = ({ useCase, logger, response: { ok, fail } }) => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const { action, userEmail, complete } = req.query;

        if (action === 'all' && process.env.NODE_ENV === DEVELOPMENT) {
          const data = await useCase.get.all();
          res.status(STATUS.OK).json(ok(data));
        } else if (action === 'getByUser' && userEmail) {
          const data = await useCase.get.list({ userEmail });
          return res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete or invalid query');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .post(async (req, res) => {
      try {
        const { action, userEmail } = req.query;
        const { name, items } = req.body;

        if (action === 'user' && userEmail && name && items) {
          const data = await useCase.post.create({ name, items, userEmail });
          res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete or invalid body/query');
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
          return res.sendStatus(STATUS.NOT_FOUND);
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { action, userEmail } = req.query;
        const { id } = req.params;

        if (action === 'user' && id && userEmail) {
          const data = await useCase.get.find({ id, userEmail });
          res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete or invalid params/query');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .put(async (req, res) => {
      try {
        const { action, userEmail } = req.query;
        const { name, items } = req.body;
        const { id } = req.params;

        if (action === 'user' && id && userEmail && (name || items)) {
          const updated = await useCase.put.update(
            { id, userEmail },
            { name, items }
          );
          if (updated) return res.sendStatus(STATUS.NO_CONTENT);
          return res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Incomplete or invalid params/query/body');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .delete(async (req, res) => {
      try {
        const { action, userEmail } = req.query;
        const { id } = req.params;

        if (action === 'user' && id && userEmail) {
          const deleted = await useCase.delete.remove({ id, userEmail });
          if (deleted) return res.sendStatus(STATUS.NO_CONTENT);
          res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Incomplete or invalid params/query');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    });

  return router;
};
