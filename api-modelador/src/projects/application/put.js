const ApplicationError = require('./applicationError');

module.exports = ({ repository, models }) => {
  const update = ({ id, email }, body) => {
    return Promise.resolve()
      .then(() => {
        const updated = repository.update(body, {
          include: [{
            model: models.get('users'),
            through: {
              attributes: ['email'],
              where: { email: email }
            }
          }],
          where: { id },
        });

        if (updated || updated[0] > 0) return updated;
        throw new ApplicationError('Impossible to update');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    update,
  };
};
