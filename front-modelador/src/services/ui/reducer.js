/* eslint-disable indent */
import * as T from '@services/ui/actionsTypes';
import { APPBAR_TAB_POS_DEFAULT_VALUE } from '@constants/ui';

const initialState = {
  // Tab
  tabIndex: APPBAR_TAB_POS_DEFAULT_VALUE,
  // Navbar
  navItemIndex: -1,
  navItemId: null,
  navManuItemId: null,
  navMenuActive: false,
  navMenuAnchorEl: null,
  // Modal
  modalParentId: null,
  modalOpen: false,
  modalType: null,
  modalData: null,
  // Canvas
  itemType: null,
  noteTbStatus: false,
  // Panel
  indexPanel: 0,
  // Extras
  isLoading: false,
  error: null,
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // UI
    case T.CHANGE_ACTIVE_TAB:
      return { ...state, tabIndex: payload.tabIndex };
    case T.UNSELECT_ITEM:
      return {
        ...state,
        navItemIndex: -1,
        navItemId: null,
        itemType: null,
      };

    // Canvas
    case T.SET_ITEM_TYPE:
      return { ...state, itemType: payload.itemType };
    case T.TOGGLE_NOTETB_STATUS:
      return { ...state, noteTbStatus: !state.noteTbStatus };
    case T.SET_NOTETB_ACTIVE:
      return { ...state, noteTbStatus: true };
    case T.SET_NOTETB_INACTIVE:
      return { ...state, noteTbStatus: false };

    // Navbar
    case T.CHANGE_ACTIVE_NAVITEM:
      return {
        ...state,
        navItemIndex: payload.navItem.index,
        navItemId: payload.navItem.id,
        navMenuActive: payload.navItem.hasOptions,
        navMenuAnchorEl: payload.navItem.anchorEl,
      };
    case T.CHANGE_NAV_MENU_ITEM_ID:
      return { ...state, navMenuItemId: payload.id };
    case T.SET_MENU_ACTIVE:
      return { ...state, navMenuActive: true };
    case T.SET_MENU_INACTIVE:
      return { ...state, navMenuItemId: null, navMenuActive: false };

    // Modal
    case T.SET_MODAL:
      return {
        ...state,
        modalParentId: payload.modal.id,
        modalOpen: payload.modal.open,
        modalType: payload.modal.type,
        modalData: payload.modal.data,
      };
    case T.DISPOSE_MODAL:
      return {
        ...state,
        modalParentId: null,
        modalOpen: false,
        modalType: null,
        modalData: null,
      };

    // Panel
    case T.SET_INDEX_PANEL:
      return {
        ...state,
        indexPanel: payload.index,
      };

    // General
    case T.RESET_UI:
      return {
        ...state,
        // Navbar
        navItemIndex: -1,
        navItemId: null,
        navMenuItemId: null,
        navMenuActive: false,
        navMenuAnchorEl: null,
        // Canvas
        itemType: null,
        noteTbStatus: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
