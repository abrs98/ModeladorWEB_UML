import * as T from '@services/project/actionsTypes';

export const getProjects = () => ({
  type: T.PROJECTS_REQUESTED,
});

export const getProject = ({ id }) => ({
  type: T.PROJECT_REQUESTED,
  payload: { id },
});

export const setProjects = ({ projects }) => ({
  type: T.SET_PROJECTS,
  payload: { projects },
});

export const setProject = ({ project }) => ({
  type: T.SET_PROJECT,
  payload: { project },
});

export const createProject = ({ name }) => ({
  type: T.CREATE_PROJECT_REQUESTED,
  payload: { name },
});

export const updateProject = ({ id, name }) => ({
  type: T.UPDATE_PROJECT_REQUESTED,
  payload: { id, name },
});

export const removeProject = ({ id }) => ({
  type: T.REMOVE_PROJECT_REQUESTED,
  payload: { id },
});

export const addMember = ({ id, email }) => ({
  type: T.ADD_MEMBER_REQUESTED,
  payload: { id, email },
});

export const removeMember = ({ id, email }) => ({
  type: T.REMOVE_MEMBER_REQUESTED,
  payload: { id, email },
});

export const createDiagramInProject = ({ projectId, diagram }) => ({
  type: T.LOCAL_CREATE_DIAGRAM_IN_PROJECT,
  payload: { projectId, diagram },
});

export const removeDiagramInProject = ({ projectId, diagramId }) => ({
  type: T.LOCAL_REMOVE_DIAGRAM_IN_PROJECT,
  payload: { projectId, diagramId },
});
