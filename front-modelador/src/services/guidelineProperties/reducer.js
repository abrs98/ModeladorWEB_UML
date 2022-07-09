/* eslint-disable indent */
import * as T from '@services/guidelineProperties/actionsTypes';

const initialState = {
  x0: 0,
  y0: 0,
  active: false,
};

const guidelinePropsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.SET_GUIDELINE_POSITION_0:
      return { ...state, x0: payload.x0, y0: payload.y0 };
    case T.SET_GUIDELINE_ACTIVE:
      return { ...state, active: true };
    case T.SET_GUIDELINE_INACTIVE:
      return { ...state, active: false };
    case T.SET_GUIDELINE_PROPERTIES:
      return { ...state, ...payload.properties };
    case T.SET_DEFAULT_GUIDELINE_STATE:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

export default guidelinePropsReducer;
