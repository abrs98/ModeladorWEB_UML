/* eslint-disable prettier/prettier */
const ApplicationError = require('./applicationError');

module.exports = ({ repository, models }) => {
  const all = () => {
    return Promise.resolve()
      .then(() => {
        const result = repository.findAll({
          include: [{
            model: models.get('users'),
            as: 'team',
            through: { attributes: [] },
            attributes: ['id', 'name', 'email'],
          }, {
            model: models.get('diagrams'),
            as: 'diagrams',
            attributes: ['id', 'name', 'items'],
          }],
        });
        if (result) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const findByPk = ({ id }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.findByPk(id, {
          include: [{
            model: models.get('users'),
            as: 'team',
            through: { attributes: [] },
            attributes: ['id', 'name', 'email'],
          }, {
            model: models.get('diagrams'),
            as: 'diagrams',
            attributes: ['id', 'name', 'items'],
          }],
        });
        if (result || result.length > 0) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const findByUserEmail = ({ email }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: {
            '$team.email$': email
          },
          include: [{
            model: models.get('users'),
            as: 'team',
            through: { attributes: [] },
            /*where: {
              'email': email,
            },*/
            attributes: ['id', 'name', 'email'],
          }, {
            model: models.get('diagrams'),
            as: 'diagrams',
            attributes: ['id', 'name', 'items'],
          }],
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
    findByPk,
    findByUserEmail,
  };
};
