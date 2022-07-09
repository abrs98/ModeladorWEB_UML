import * as T from '@services/currentWork/actionsTypes';

export const resetWork = () => ({
  type: T.INIT_WORK,
});

export const setWorkName = ({ name }) => ({
  type: T.SET_NAME,
  payload: { name },
});

export const setProjectProps = ({ projectId }) => ({
  type: T.SET_PROJECT_PROPS,
  payload: { projectId },
});

export const replaceWork = ({ id, name, items }) => ({
  type: T.REPLACE_WORK,
  payload: { id, name, items },
});

export const saveWork = ({ id }) => ({
  type: T.SAVE_WORK,
  payload: { id },
});

export const updatingAssociationIds = (ids) => ({
  type: T.UPDATING_ASSOCIATION_IDS,
  payload: { ids },
});

export const addItem = (item) => ({
  type: T.ADD_ITEM,
  payload: { item: { ...item } },
});

export const updateItem = (item) => ({
  type: T.UPDATE_ITEM,
  payload: { item: { ...item } },
});

export const removeItem = (item) => ({
  type: T.REMOVE_ITEM,
  payload: { item: { ...item } },
});

export const setCurrSelect = ({ currSelect }) => ({
  type: T.SET_CURR_SELECT,
  payload: { currSelect },
});

export const setLastSelect = ({ lastSelect }) => ({
  type: T.SET_LAST_SELECT,
  payload: { lastSelect },
});
