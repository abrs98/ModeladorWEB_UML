import api from '@services/api/base';
import config from '@config';

const apiConfig = config.api;

export const getTDiagrams = ({ email }) => {
  return api
    .get(`${apiConfig.routes.tdiagram}`, {
      params: {
        action: 'getByUser',
        userEmail: email,
      },
    })
    .then((response) => response);
};

export const createTDiagramByUser = ({ email, tdiagram }) => {
  return api
    .post(
      `${apiConfig.routes.tdiagram}`,
      {
        ...tdiagram,
        items: JSON.stringify(tdiagram.items),
      },
      {
        params: {
          action: 'user',
          userEmail: email,
        },
      }
    )
    .then((response) => response);
};

export const updateTDiagramByUser = ({ id, email, tdiagram }) => {
  return api
    .put(
      `${apiConfig.routes.tdiagram}/${id}`,
      {
        ...tdiagram,
        items: JSON.stringify(tdiagram.items),
      },
      {
        params: {
          action: 'user',
          userEmail: email,
        },
      }
    )
    .then((response) => response);
};

export const removeTDiagramByUser = ({ id, email }) => {
  return api
    .delete(`${apiConfig.routes.tdiagram}/${id}`, {
      params: {
        action: 'user',
        userEmail: email,
      },
    })
    .then((response) => response);
};
