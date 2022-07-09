import * as T from '@services/diagram/actionsTypes';

export const getDiagrams = () => ({
  type: T.DIAGRAMS_REQUESTED,
});

export const setDiagrams = ({ diagrams }) => ({
  type: T.SET_DIAGRAMS,
  payload: { diagrams },
});

export const saveNewDiagramByProject = ({ id, name, items }) => ({
  type: T.SAVE_NEW_DIAGRAM_BY_PROJECT_REQUESTED,
  payload: { id, name, items },
});
export const saveNewDiagram = ({ name, items }) => ({
  type: T.SAVE_NEW_DIAGRAM_REQUESTED,
  payload: { name, items },
});
export const saveNewDiagramPending = () => ({
  type: T.SAVE_NEW_DIAGRAM_PENDING,
});
export const saveNewDiagramSuccess = (diagram) => ({
  type: T.SAVE_NEW_DIAGRAM_SUCCESS,
  payload: { diagram },
});
export const saveNewDiagramFailed = (error) => ({
  type: T.SAVE_NEW_DIAGRAM_FAILED,
  payload: { error },
});

export const saveDiagram = () => ({
  type: T.SAVE_DIAGRAM_REQUESTED,
});

export const updateDiagram = ({ id, name, items }) => ({
  type: T.UPDATE_DIAGRAM_REQUESTED,
  payload: { id, name, items },
});
export const updateDiagramName = ({ id, name }) => ({
  type: T.UPDATE_DIAGRAM_NAME_REQUESTED,
  payload: { id, name },
});

export const deleteDiagram = ({ id }) => ({
  type: T.DELETE_DIAGRAM_REQUESTED,
  payload: { id },
});
export const deleteDiagramByProject = ({ id, projectId }) => ({
  type: T.DELETE_DIAGRAM_BY_PROJECT_REQUESTED,
  payload: { id, projectId },
});
