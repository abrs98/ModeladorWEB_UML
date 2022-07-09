/* eslint-disable prettier/prettier */
const ApplicationError = require('./applicationError');

module.exports = ({ repository, models }) => {
  const relationships = (complete) => {
    if (complete === 'all') {
      return {
        include: [{
          model: models.get('projects'),
          attributes: ['id'],
        }],
      };
    } else {
      return {};
    }
  };

  const all = ({ options }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.findAll(relationships(options.complete));
        if (result) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const list = ({ ...key }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: { ...key },
        });
        if (result) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const find = ({ id, ...key }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: { id, ...key },
          // ...relationships(options.complete),
        });
        if (result || result.length > 0) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    all,
    list,
    find,
  };
};
