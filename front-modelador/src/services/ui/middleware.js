/* eslint-disable indent */
import { saveSvgAsPng } from 'save-svg-as-png';

import * as T from '@services/ui/actionsTypes';
import { resetWork } from '@services/currentWork/actions';
import { getDiagrams, saveDiagram } from '@services/diagram/actions';
import { setDefaultItemState } from '@services/itemProperties/actions';
import { getProjects } from '@services/project/actions';
import { getTDiagrams } from '@services/template/actions';
import {
  setItemType,
  setModal,
  resetUi,
  setIndexPanel,
  setNoteTbInactive,
} from '@services/ui/actions';
import { ELEMENT, ASSOCIATION } from '@layout/canvas/lib';
import config from '@config';
import * as C from '@constants';

const convertItemType = (id) => {
  switch (id) {
    case C.NAV_CONTROL:
      return ELEMENT.CONTROL;
    case C.NAV_BOUNDARY:
      return ELEMENT.BOUNDARY;
    case C.NAV_ENTITY:
      return ELEMENT.ENTITY;
    case C.NAV_ACTOR:
      return ELEMENT.ACTOR;
    case C.NAV_ASSOCIATION:
      return ASSOCIATION.SIMPLE;
    case C.NAV_ASSOCIATION_WITH:
      return ASSOCIATION.WITH_NAV;
    default:
      return null;
  }
};

export default ({ getState, dispatch }) => (next) => (action) => {
  const { type, payload } = action;
  const { id, name, items } = getState().currentWork;
  const { noteTbStatus } = getState().ui;

  switch (type) {
    case T.CHANGE_ACTIVE_TAB:
      dispatch(resetUi());
      break;

    case T.CHANGE_ACTIVE_NAVITEM:
      let navItemId = payload?.navItem?.id;
      let itemType = convertItemType(navItemId);
      if (navItemId === C.NAV_MY_FILES) {
        dispatch(getProjects());
        dispatch(setIndexPanel(C.PROJECTS_PANEL_INDEX));
      } else if (navItemId === C.NAV_CLOSE_WORK) {
        dispatch(resetWork());
        dispatch(setDefaultItemState());
      } else if (navItemId === C.NAV_NEW_DIAGRAM) {
        config?.modal?.forEach(({ parent, type, data }) => {
          if (parent?.includes(navItemId)) {
            dispatch(setModal({ id: parent, open: true, type, data }));
          }
        });
      } else if (navItemId === C.NAV_OPEN_FILE) {
        // nothing here, because have menu
      } else if (navItemId === C.NAV_SAVE_DIAGRAM) {
        if (id) {
          dispatch(saveDiagram());
        } else {
          config?.modal?.forEach(({ parent, type, data }) => {
            if (parent?.includes(navItemId)) {
              dispatch(setModal({ id: parent, open: true, type, data }));
            }
          });
        }
      } else if (navItemId === C.NAV_SAVE_AS) {
        // nothing here, because have menu
      } else {
        if (noteTbStatus) {
          dispatch(setNoteTbInactive());
        }
        dispatch(setItemType(itemType));
      }
      break;

    case T.CHANGE_NAV_MENU_ITEM_ID:
      let menuItemId = payload?.id;
      if (menuItemId === C.MENU_TEMPLATES) {
        dispatch(getTDiagrams());
        dispatch(setIndexPanel(C.TEMPLATES_PANEL_INDEX));
      } else if (menuItemId === C.MENU_DIAGRAMS) {
        dispatch(getDiagrams());
        dispatch(setIndexPanel(C.DIAGRAMS_PANEL_INDEX));
      } else if (menuItemId === C.MENU_SAVE_AS_TEMPLATE) {
        config?.modal?.forEach(({ parent, type, data }) => {
          if (parent?.includes(menuItemId)) {
            dispatch(setModal({ id: parent, open: true, type, data }));
          }
        });
      } else if (menuItemId === C.MENU_SAVE_AS_JPG) {
        saveSvgAsPng(document.getElementById('canvas'), `diagram-${name}.png`);
      }
      break;

    default:
      break;
  }
  return next(action);
};
