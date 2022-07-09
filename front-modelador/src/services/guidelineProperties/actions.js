import * as T from '@services/guidelineProperties/actionsTypes';

export const setGuidelinePosition0 = (x0, y0) => ({
  type: T.SET_GUIDELINE_POSITION_0,
  payload: { x0, y0 },
});

export const setGuidelineActive = () => ({
  type: T.SET_GUIDELINE_ACTIVE,
});

export const setGuidelineInactive = () => ({
  type: T.SET_GUIDELINE_INACTIVE,
});

export const setGuidelineProperties = (properties) => ({
  type: T.SET_GUIDELINE_PROPERTIES,
  payload: { properties },
});

export const setDefaultGuidelineState = () => ({
  type: T.SET_DEFAULT_GUIDELINE_STATE,
});
