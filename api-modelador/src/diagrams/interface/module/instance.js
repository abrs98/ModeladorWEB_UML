const container = require('../../../container');
const { get, post, put, remove } = require('../../application');

module.exports = () => {
  const {
    repository: { diagramRepository },
    database: { models },
  } = container.cradle;

  const getUseCase = get({ repository: diagramRepository, models });
  const postUseCase = post({ repository: diagramRepository, models });
  const putUseCase = put({ repository: diagramRepository, models });
  const deleteUseCase = remove({ repository: diagramRepository, models });

  return {
    useCase: {
      get: getUseCase,
      post: postUseCase,
      put: putUseCase,
      delete: deleteUseCase,
    },
  };
};
