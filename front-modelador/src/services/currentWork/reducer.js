/* eslint-disable indent */
import * as T from '@services/currentWork/actionsTypes';
import { ASSOCIATION } from '@layout/canvas/lib';

const __defaultSelection = {
  id: null,
  type: null,
  connections: null,
};

const initialState = {
  id: null,
  name: 'New diagram',
  items: [],
  currSelect: {
    id: null,
    type: null,
    connections: null,
  },
  lastSelect: {
    id: null,
    type: null,
    connections: null,
  },
  projectId: null,
  isProject: false,
  isSaved: false,
};

const currentWorkReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.INIT_WORK:
      return { ...initialState };

    case T.SET_NAME:
      return { ...state, name: payload?.name };
    case T.SET_PROJECT_PROPS:
      return { ...state, projectId: payload.projectId, isProject: true };

    case T.UPDATING_ASSOCIATION_IDS:
      let [tempItems, conns] = [state.items, payload.ids];
      tempItems?.map((item) => {
        const { id } = item;
        if (conns.includes(id)) {
          const connection = conns[conns.indexOf(id) - 1];
          if (connection) {
            item.connections.push(connection);
          } else {
            item.connections.push(conns.slice(-1)[0]);
          }
        }
        return item;
      });
      return { ...state, items: [...tempItems] };

    case T.ADD_ITEM:
      return {
        ...state,
        items: [{ ...payload?.item }, ...state?.items],
        isSaved: false,
      };

    case T.UPDATE_ITEM:
      return {
        ...state,
        items: state?.items?.map((target) =>
          target?.id === payload?.item?.id ? payload?.item : target
        ),
        isSaved: false,
      };

    case T.REMOVE_ITEM:
      const { item } = payload;
      let items = state?.items;
      const index = items?.findIndex((target) => target?.id === item?.id);
      if (index >= 0) {
        const foundItem = items[index];
        for (let j = 0; j < items.length; j++) {
          if (foundItem.type.includes(ASSOCIATION.KEY)) {
            if (items[j].id === foundItem.connections[0]) {
              items[j].connections.splice(
                items[j].connections.indexOf(foundItem.connections[1]),
                1
              );
            }
            if (items[j].id === foundItem.connections[1]) {
              items[j].connections.splice(
                items[j].connections.indexOf(foundItem.connections[0]),
                1
              );
            }
          }
          if (
            items[j].connections.includes(foundItem.id) &&
            items[j].type.includes(ASSOCIATION.KEY)
          ) {
            const index = items.findIndex(
              (target) => target?.id === items[j]?.id
            );
            if (index >= 0) {
              items?.splice(index, 1);
            }
            j--;
          }
        }
      }
      return {
        ...state,
        items: items?.filter((target) => target?.id !== item?.id),
        isSaved: false,
      };

    case T.SAVE_WORK:
      return { ...state, id: payload?.id, isSaved: true };

    case T.UNSAVE_WORK:
      return { ...state, isSaved: false };

    case T.SET_CURR_SELECT:
      return { ...state, currSelect: payload?.currSelect };

    case T.SET_LAST_SELECT:
      return { ...state, lastSelect: payload?.lastSelect };

    case T.REPLACE_WORK:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        items: payload.items,
        currSelect: __defaultSelection,
        lastSelect: __defaultSelection,
        isSaved: true,
      };

    default:
      return state;
  }
};

export default currentWorkReducer;
