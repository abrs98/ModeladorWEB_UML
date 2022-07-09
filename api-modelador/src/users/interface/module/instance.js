const container = require('../../../container');
const { get, post, put, remove } = require('../../application');

module.exports = () => {
  const {
    repository: { userRepository },
    database: { models },
  } = container.cradle;

  const getUseCase = get({ repository: userRepository, models });
  const postUseCase = post({ repository: userRepository, models });
  const putUseCase = put({ repository: userRepository, models });
  const deleteUseCase = remove({ repository: userRepository, models });

  return {
    useCase: {
      get: getUseCase,
      post: postUseCase,
      put: putUseCase,
      delete: deleteUseCase,
    },
  };
};
