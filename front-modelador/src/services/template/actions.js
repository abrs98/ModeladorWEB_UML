import * as T from '@services/template/actionsTypes';

export const getTDiagrams = () => ({
  type: T.TDIAGRAMS_REQUESTED,
});

export const setTDiagrams = ({ tdiagrams }) => ({
  type: T.SET_TDIAGRAMS,
  payload: { tdiagrams },
});

export const createTDiagram = ({ name, items }) => ({
  type: T.CREATE_TDIAGRAM_REQUESTED,
  payload: { name, items },
});
export const saveAsTDiagram = ({ name, items }) => ({
  type: T.CREATE_TDIAGRAM_REQUESTED,
  payload: { name, items },
});

export const updateTDiagram = ({ id, name, items }) => ({
  type: T.UPDATE_TDIAGRAM_REQUESTED,
  payload: { id, name, items },
});
export const updateTDiagramName = ({ id, name }) => ({
  type: T.UPDATE_TDIAGRAM_REQUESTED,
  payload: { id, name },
});

export const removeTDiagram = ({ id }) => ({
  type: T.REMOVE_TDIAGRAM_REQUESTED,
  payload: { id },
});

// Only for saga
export const tdiagramsPending = () => ({
  type: T.TDIAGRAMS_PENDING,
});
export const tdiagramsReceived = ({ tdiagrams }) => ({
  type: T.TDIAGRAMS_RECEIVED,
  payload: { tdiagrams },
});
export const tdiagramsRequestFailed = ({ error }) => ({
  type: T.TDIAGRAMS_REQUEST_FAILED,
  payload: { error },
});

export const createTDiagramPending = () => ({
  type: T.CREATE_TDIAGRAM_PENDING,
});
export const createTDiagramSuccess = () => ({
  type: T.CREATE_TDIAGRAM_SUCCESS,
});
export const createTDiagramFailed = ({ error }) => ({
  type: T.CREATE_TDIAGRAM_FAILED,
  payload: { error },
});

export const updateTDiagramPending = () => ({
  type: T.UPDATE_TDIAGRAM_PENDING,
});
export const updateTDiagramSuccess = () => ({
  type: T.UPDATE_TDIAGRAM_SUCCESS,
});
export const updateTDiagramFailed = ({ error }) => ({
  type: T.UPDATE_TDIAGRAM_FAILED,
  payload: { error },
});

export const removeTDiagramPending = () => ({
  type: T.REMOVE_TDIAGRAM_PENDING,
});
export const removeTDiagramSuccess = () => ({
  type: T.REMOVE_TDIAGRAM_SUCCESS,
});
export const removeTDiagramFailed = ({ error }) => ({
  type: T.REMOVE_TDIAGRAM_FAILED,
  payload: { error },
});
