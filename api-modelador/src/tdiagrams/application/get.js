const ApplicationError = require('./applicationError');

module.exports = ({ repository }) => {
  const all = () => {
    return Promise.resolve()
      .then(() => {
        const result = repository.findAll({});
        if (result) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const list = ({ ...key }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: { ...key },
        });
        if (result) return result;
        throw new ApplicationError('No result available');
      })
      .catch((err) => {
        throw new ApplicationError(err);
      });
  };

  const find = ({ id, ...key }) => {
    return Promise.resolve()
      .then(() => {
        const result = repository.find({
          where: { id, ...key },
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
    list,
    find,
  };
};
