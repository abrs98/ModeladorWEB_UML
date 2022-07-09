const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const create = ({ name, items, ...key }) => {
    return Promise.resolve()
      .then(() => {
        const newEntity = repository.create({
          name,
          items,
          ...key,
        });

        if (newEntity) return newEntity;
        throw new ApplicationError('Cant create a tdiagram');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    create,
  };
};
