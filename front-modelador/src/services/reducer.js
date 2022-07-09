import { combineReducers } from 'redux';
import { default as currentWorkReducer } from '@services/currentWork/reducer';
import { default as diagramReducer } from '@services/diagram/reducer';
import { default as guidelinePropsReducer } from '@services/guidelineProperties/reducer';
import { default as itemPropertiesReducer } from '@services/itemProperties/reducer';
import { default as notificationReducer } from '@services/notification/reducer';
import { default as projectReducer } from '@services/project/reducer';
import { default as tdiagramReducer } from '@services/template/reducer';
import { default as uiReducer } from '@services/ui/reducer';
import { default as userReducer } from '@services/user/reducer';

export default combineReducers({
  user: userReducer,
  diagram: diagramReducer,
  template: tdiagramReducer,
  ui: uiReducer,
  notification: notificationReducer,
  itemProperties: itemPropertiesReducer,
  guidelineProperties: guidelinePropsReducer,
  project: projectReducer,
  currentWork: currentWorkReducer,
});
