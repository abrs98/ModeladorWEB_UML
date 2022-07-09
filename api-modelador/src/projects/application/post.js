const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const addMember = ({ id, email }) => {
    return Promise.resolve()
      .then(() => {
        const newEntity = repository.addMember(id, email);

        if (newEntity) return newEntity;
        throw new ApplicationError('Cant create a project');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const create = ({ name }) => {
    return Promise.resolve()
      .then(() => {
        const newEntity = repository.create({
          name,
        });

        if (newEntity) return newEntity;
        throw new ApplicationError('Cant create a project');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  return {
    addMember,
    create,
  };
};
