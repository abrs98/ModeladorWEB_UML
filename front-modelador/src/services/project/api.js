import api from '@services/api/base';
import config from '@config';

const apiConfig = config.api;

export const getProjects = ({ email }) => {
  return api
    .get(`${apiConfig.routes.project}`, {
      params: {
        action: 'findByEmail',
        email: email,
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const getProjectById = ({ id }) => {
  return api
    .get(`${apiConfig.routes.project}${id}`, {
      params: {
        action: 'findByProjectId',
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const createProject = ({ email, name }) => {
  return api
    .post(`${apiConfig.routes.project}`, {
      name,
      email,
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const updateProject = ({ id, email, name }) => {
  return api
    .put(`${apiConfig.routes.project}${id}`, {
      email,
      name,
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const removeProject = ({ id }) => {
  return api
    .delete(`${apiConfig.routes.project}${id}`, {
      params: {
        action: 'removeProject',
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};

export const addMember = ({ id, email }) => {
  return api
    .post(
      `${apiConfig.routes.project}${id}`,
      {
        email,
      },
      {
        params: {
          action: 'addMember',
        },
      }
    )
    .then((response) => response)
    .catch((err) => err.response);
};

export const removeMember = ({ id, email }) => {
  return api
    .delete(`${apiConfig.routes.project}${id}`, {
      params: {
        action: 'removeMember',
        email: email,
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};
