import api from '@services/api/base';
import config from '@config';

const apiConfig = config.api;

export const getDiagrams = ({ email }) => {
  return api
    .get(`${apiConfig.routes.diagram}`, {
      params: {
        action: 'getByUser',
        userEmail: email,
      },
    })
    .then((response) => response);
};

export const createDiagram = ({ diagram, ...key }) => {
  return api
    .post(`${apiConfig.routes.diagram}`, {
      ...diagram,
      items: JSON.stringify(diagram.items),
      ...key,
    })
    .then((response) => response);
};

export const createDiagramByUser = ({ email, diagram }) => {
  return api
    .post(
      `${apiConfig.routes.diagram}`,
      {
        ...diagram,
        items: JSON.stringify(diagram.items),
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

export const createDiagramByProject = ({ id, diagram }) => {
  return api
    .post(
      `${apiConfig.routes.diagram}`,
      {
        ...diagram,
        items: JSON.stringify(diagram.items),
        projectId: id,
      },
    )
    .then((response) => response);
};

export const updateDiagram = ({ id, diagram, ...key }) => {
  return api
    .put(`${apiConfig.routes.diagram}${id}`, {
      ...diagram,
      items: JSON.stringify(diagram.items),
      ...key,
    })
    .then((response) => response);
};

export const updateDiagramByUser = ({ id, email, diagram }) => {
  return api
    .put(
      `${apiConfig.routes.diagram}${id}`,
      {
        ...diagram,
        items: JSON.stringify(diagram.items),
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

export const updateDiagramByProject = ({ id, projectId, diagram }) => {
  return api
    .delete(
      `${apiConfig.routes.diagram}${id}`,
      {
        ...diagram,
        items: JSON.stringify(diagram.items),
        projectId: projectId,
      },
    )
    .then((response) => response);
};

export const deleteDiagramByUser = ({ id, email }) => {
  return api
    .delete(`${apiConfig.routes.diagram}${id}`, {
      params: {
        action: 'user',
        userEmail: email,
      },
    })
    .then((response) => response);
};

export const deleteDiagramByProject = ({ id, projectId }) => {
  return api
    .delete(`${apiConfig.routes.diagram}${id}`, {
      params: {
        action: 'project',
        projectId: projectId,
      },
    })
    .then((response) => response);
};
