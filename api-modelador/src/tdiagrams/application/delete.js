const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const all = () => {
    return Promise.resolve()
      .then(() => {
        return repository.deleteAll();
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const remove = ({ id, ...key }) => {
    return Promise.resolve()
      .then(() => {
        const deletedEntity = repository.delete({
          where: { id, ...key },
        });

        if (deletedEntity || deletedEntity[0] > 0) return deletedEntity;
        throw new ApplicationError('Impossible to remove');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    all,
    remove,
  };
};
