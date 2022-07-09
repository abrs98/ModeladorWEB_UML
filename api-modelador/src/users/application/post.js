const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const create = ({ name, email }) => {
    return Promise.resolve()
      .then(() => {
        const newEntity = repository.create({
          name,
          email,
        });

        if (newEntity) return newEntity;
        throw new ApplicationError('Cannot create');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    create,
  };
};
