const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const update = ({ email, name }) => {
    return Promise.resolve()
      .then(() => {
        const updatedEntity = repository.update(
          { email, name },
          {
            where: { email },
          }
        );

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
