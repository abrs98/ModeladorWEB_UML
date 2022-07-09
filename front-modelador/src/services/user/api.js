import api from '@services/api/base';
import config from '@config';

const apiConfig = config.api;

export const findUser = ({ email }) => {
  return api
    .get(`${apiConfig.routes.user}/${email}`, {
      params: {
        complete: 'none',
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const createUser = ({ email, name }) => {
  return api
    .post(`${apiConfig.routes.user}`, { email, name })
    .then((response) => response)
    .catch((err) => err.response);
};
