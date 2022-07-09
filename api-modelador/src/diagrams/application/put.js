const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const update = ({ id, ...key }, body) => {
    return Promise.resolve()
      .then(() => {
        const updatedEntity = repository.update(body, {
          where: { id, ...key },
        });

        if (updatedEntity || updatedEntity[0] > 0) return updatedEntity;
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
