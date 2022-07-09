import * as T from '@services/itemProperties/actionsTypes';

export const setItemDto = (dto) => ({
  type: T.SET_ITEM_DTO,
  payload: { dto },
});

export const setItemNote = (note) => ({
  type: T.SET_ITEM_NOTE,
  payload: { note },
});

export const setItemText = (text) => ({
  type: T.SET_ITEM_TEXT,
  payload: { text },
});

export const setItemActive = () => ({
  type: T.SET_ITEM_ACTIVE,
});

export const setItemInactive = () => ({
  type: T.SET_ITEM_INACTIVE,
});

export const setItemNoteActive = () => ({
  type: T.SET_ITEM_NOTE_ACTIVE,
});

export const setItemNoteInactive = () => ({
  type: T.SET_ITEM_NOTE_INACTIVE,
});

export const setItemTextActive = () => ({
  type: T.SET_ITEM_TEXT_ACTIVE,
});

export const setItemTextInactive = () => ({
  type: T.SET_ITEM_TEXT_INACTIVE,
});

export const setItemPositionEl = (positionEl) => ({
  type: T.SET_ITEM_POSITION_EL,
  payload: { positionEl },
});

export const setDefaultItemState = () => ({
  type: T.SET_DEFAULT_ITEM_STATE,
});
