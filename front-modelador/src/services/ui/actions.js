import * as T from '@services/ui/actionsTypes';

// UI
export const changeActiveTab = (tabIndex) => ({
  type: T.CHANGE_ACTIVE_TAB,
  payload: { tabIndex },
});
export const unselectItem = () => ({ type: T.UNSELECT_ITEM });

// Canvas
export const setItemType = (itemType) => ({
  type: T.SET_ITEM_TYPE,
  payload: { itemType },
});
export const toggleNoteTbStatus = () => ({
  type: T.TOGGLE_NOTETB_STATUS,
});
export const setNoteTbActive = () => ({
  type: T.SET_NOTETB_ACTIVE,
});
export const setNoteTbInactive = () => ({
  type: T.SET_NOTETB_INACTIVE,
});

// Navbar
export const changeActiveNavItem = (navItem) => ({
  type: T.CHANGE_ACTIVE_NAVITEM,
  payload: { navItem },
});
export const changeMenuItemId = (id) => ({
  type: T.CHANGE_NAV_MENU_ITEM_ID,
  payload: { id },
});
export const setMenuActive = () => ({
  type: T.SET_MENU_ACTIVE,
});
export const setMenuInactive = () => ({
  type: T.SET_MENU_INACTIVE,
});

// Modal
export const setModal = (modal) => ({
  type: T.SET_MODAL,
  payload: { modal },
});
export const approveModal = ({ data }) => ({ // Only for saga
  type: T.APPROVE_MODAL,
  payload: { data },
});
export const disposeModal = () => ({
  type: T.DISPOSE_MODAL,
});

// Panel
export const setIndexPanel = (index) => ({
  type: T.SET_INDEX_PANEL,
  payload: { index },
});

// General
export const resetUi = () => ({ type: T.RESET_UI });
