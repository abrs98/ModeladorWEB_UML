const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const create = ({ name, items, ...rest }) => {
    return Promise.resolve()
      .then(() => {
        const newEntity = repository.create({
          name,
          items,
          ...rest,
        });

        if (newEntity) return newEntity;
        throw new ApplicationError('Cant create a diagram');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    create,
  };
};
