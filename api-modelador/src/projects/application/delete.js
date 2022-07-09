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

  const remove = ({ id }) => {
    return Promise.resolve()
      .then(() => {
        const deleted = repository.delete({
          where: { id },
        });

        if (deleted) return deleted;
        throw new ApplicationError('Impossible to remove');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const removeMember = ({ id, email }) => {
    return Promise.resolve()
      .then(() => {
        const deleted = repository.removeMember(id, email);

        if (deleted) return deleted;
        throw new ApplicationError('Impossible to remove');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    all,
    remove,
    removeMember,
  };
};
