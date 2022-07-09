/* eslint-disable no-undef */
const STATUS = require('http-status');
const { Router } = require('express');

const SERVICE_NAME = 'diagramRouter';
const DEVELOPMENT = 'development';

module.exports = ({ useCase, logger, response: { ok, fail } }) => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const { action, userEmail, projectId, complete } = req.query;

        if (action === 'all' && process.env.NODE_ENV === DEVELOPMENT) {
          const data = await useCase.get.all({ options: { complete } });
          return res.status(STATUS.OK).json(ok(data));
        } else if (action === 'getByUser' && userEmail) {
          const data = await useCase.get.list({ userEmail });
          return res.status(STATUS.OK).json(ok(data));
        } else if (action === 'getByProject' && projectId) {
          const data = await useCase.get.list({ projectId });
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
        const { action, userEmail, projectId } = req.query;
        const { name, items, ...key } = req.body;

        if (action === 'user' && userEmail && name && items) {
          const data = await useCase.post.create({ name, items, userEmail });
          return res.status(STATUS.OK).json(ok(data));
        } else if (action === 'project' && projectId && name && items) {
          const data = await useCase.post.create({ name, items, projectId });
          return res.status(STATUS.OK).json(ok(data));
        } else if (name && items && key) {
          const data = await useCase.post.create({ name, items, ...key });
          return res.status(STATUS.OK).json(ok(data));
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
        const { action, userEmail, projectId } = req.query;
        const { id } = req.params;

        if (action === 'user' && id && userEmail) {
          const data = await useCase.get.find({ id, userEmail });
          return res.status(STATUS.OK).json(ok(data));
        } else if (action === 'project' && id && projectId) {
          const data = await useCase.get.find({ id, projectId });
          return res.status(STATUS.OK).json(ok(data));
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
        const { action, userEmail, projectId } = req.query;
        const { name, items, ...key } = req.body;
        const { id } = req.params;
        let updated = false;

        if (action === 'user' && id && userEmail && (name || items)) {
          updated = await useCase.put.update(
            { id, userEmail },
            { name, items }
          );
        } else if (action === 'project' && id && projectId && (name || items)) {
          updated = await useCase.put.update(
            { id, projectId },
            { name, items }
          );
        } else if (id && key && (name || items)) {
          updated = await useCase.put.update(
            { id, ...key },
            { name, items }
          );
        } else {
          throw new Error('Incomplete or invalid params/query/body');
        }

        if (updated) return res.sendStatus(STATUS.NO_CONTENT);
        return res.sendStatus(STATUS.NOT_FOUND);
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .delete(async (req, res) => {
      try {
        const { action, userEmail, projectId } = req.query;
        const { id } = req.params;
        let deleted = false;

        if (action === 'user' && id && userEmail) {
          deleted = await useCase.delete.remove({ id, userEmail });
        } else if (action === 'project' && id && projectId) {
          deleted = await useCase.delete.remove({ id, projectId });
        } else {
          throw new Error('Incomplete or invalid params/query');
        }

        if (deleted) return res.sendStatus(STATUS.NO_CONTENT);
        return res.sendStatus(STATUS.NOT_FOUND);
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    });

  return router;
};
