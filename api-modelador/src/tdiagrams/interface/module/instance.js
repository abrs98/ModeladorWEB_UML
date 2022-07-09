const container = require('../../../container');
const { get, post, put, remove } = require('../../application');

module.exports = () => {
  const {
    repository: { tdiagramRepository },
  } = container.cradle;

  const getUseCase = get({ repository: tdiagramRepository });
  const postUseCase = post({ repository: tdiagramRepository });
  const putUseCase = put({ repository: tdiagramRepository });
  const deleteUseCase = remove({ repository: tdiagramRepository });

  return {
    useCase: {
      get: getUseCase,
      post: postUseCase,
      put: putUseCase,
      delete: deleteUseCase,
    },
  };
};
