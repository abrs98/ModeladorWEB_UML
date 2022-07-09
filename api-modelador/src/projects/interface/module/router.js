/* eslint-disable no-undef */
const STATUS = require('http-status');
const { Router } = require('express');

const SERVICE_NAME = 'projectRoute';
const DEVELOPMENT = 'development';

module.exports = ({ useCase, logger, response: { ok, fail } }) => {
  const router = Router();

  router
    .route('/')
    .get(async (req, res) => {
      try {
        const { action, email } = req.query;

        if (action === 'all' && process.env.NODE_ENV === DEVELOPMENT) {
          const data = await useCase.get.all();
          res.status(STATUS.OK).json(ok(data));
        } else if (action === 'findByEmail' && email) {
          const data = await useCase.get.findByUserEmail({ email });
          return res.status(STATUS.OK).json(ok(data));
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
        const { name, email, creator } = req.body;

        if (name) {
          const data = await useCase.post.create({ name });
          const id = data.id;
          await useCase.post.addMember({ id, email });
          res.status(STATUS.OK).json(ok(data));
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
    .route('/:id')
    .get(async (req, res) => {
      try {
        const { action, email } = req.query;
        const { id } = req.params;

        if (action === 'findByEmailAndId') {
          const data = await useCase.get.find({ id, email });
          return res.status(STATUS.OK).json(ok(data));
        } else if (action === 'findByProjectId' && id) {
          const data = await useCase.get.findByPk({ id });
          return res.status(STATUS.OK).json(ok(data));
        } else {
          throw new Error('Incomplete or invalid params/query');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .post(async (req, res) => {
      try {
        const { action } = req.query;
        const { email } = req.body;
        const { id } = req.params;

        if (action === 'addMember' && id && email) {
          const data = await useCase.post.addMember({ id, email });
          if (data) return res.sendStatus(STATUS.NO_CONTENT);
          return res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Incomplete or invalid params/query/body');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .put(async (req, res) => {
      try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (id && email && name) {
          const updated = await useCase.put.update({ id, email }, { name });
          if (updated) return res.sendStatus(STATUS.NO_CONTENT);
          return res.sendStatus(STATUS.NOT_FOUND);
        } else {
          throw new Error('Incomplete or invalid params/body');
        }
      } catch (err) {
        logger.error({ message: err.message, service: SERVICE_NAME });
        res.status(STATUS.BAD_REQUEST).json(fail(err.message));
      }
    })
    .delete(async (req, res) => {
      try {
        const { action, email } = req.query;
        const { id } = req.params;

        if (action === 'removeProject' && id) {
          const deleted = await useCase.delete.remove({ id });
          if (deleted) return res.sendStatus(STATUS.NO_CONTENT);
          return res.sendStatus(STATUS.NOT_FOUND);
        } else if (action === 'removeMember' && id && email) {
          const data = await useCase.delete.removeMember({ id, email });
          if (data) return res.sendStatus(STATUS.NO_CONTENT);
          return res.sendStatus(STATUS.NOT_FOUND);
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
