const container = require('../../../container');
const { get, post, put, remove } = require('../../application');

module.exports = () => {
  const {
    repository: { projectRepository },
    database: { models },
  } = container.cradle;

  const getUseCase = get({ repository: projectRepository, models });
  const postUseCase = post({ repository: projectRepository, models });
  const putUseCase = put({ repository: projectRepository, models });
  const deleteUseCase = remove({ repository: projectRepository, models });

  return {
    useCase: {
      get: getUseCase,
      post: postUseCase,
      put: putUseCase,
      delete: deleteUseCase,
    },
  };
};
