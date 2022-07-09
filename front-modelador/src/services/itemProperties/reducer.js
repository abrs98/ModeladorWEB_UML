/* eslint-disable indent */
import * as T from '@services/itemProperties/actionsTypes';

const initialState = {
  id: null,
  type: null,
  coords: { x: 0, y: 0 },
  connections: [],
  note: '',
  text: '',
  scale: 1.25,
  collision: {
    rectRound: 2,
    size: 40 * 1.25, // 40 * size
  },
  color: null,
  active: false,
  ref: null,
  positionEl: null,
};

const itemPropertiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.SET_ITEM_DTO:
      return { ...state, ...payload.dto };
    case T.SET_ITEM_ACTIVE:
      return { ...state, active: true };
    case T.SET_ITEM_INACTIVE:
      return { ...state, active: false };

    case T.SET_ITEM_NOTE:
      return { ...state, note: payload.note };
    case T.SET_ITEM_TEXT:
      return { ...state, text: payload.text };

    case T.SET_ITEM_POSITION_EL:
      return { ...state, positionEl: payload.positionEl };
    case T.SET_DEFAULT_ITEM_STATE:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

export default itemPropertiesReducer;
