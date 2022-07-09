/* eslint-disable prettier/prettier */
const ApplicationError = require('./applicationError');

module.exports = ({ repository, models }) => {
  const relationships = (complete = 'all') => {
    if (complete === 'all') {
      return {
        include: [{
          model: models.get('diagrams'),
          as: 'diagrams',
          attributes: ['id', 'name', 'items'],
        }, {
          model: models.get('tdiagrams'),
          as: 'tdiagrams',
          attributes: ['id', 'name', 'items'],
        }, {
          model: models.get('projects'),
          as: 'projects',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        }],
      };
    } else if (complete === 'onlyDiagrams') {
      return {
        include: [{
          model: models.get('diagrams'),
          as: 'diagrams',
          attributes: ['id', 'name', 'items'],
        }],
      };
    } else if (complete === 'onlyTdiagrams') {
      return {
        include: [{
          model: models.get('tdiagrams'),
          as: 'projects',
          attributes: ['id', 'name', 'items'],
        }],
      };
    } else if (complete === 'onlyProjects') {
      return {
        include: [{
          model: models.get('projects'),
          as: 'projects',
          through: { attributes: [] },
          attributes: ['id', 'name'],
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

  const find = ({ id, options }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: { email: id },
          ...relationships(options.complete),
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
    find,
  };
};
