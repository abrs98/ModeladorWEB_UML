import * as T from '@services/template/actionsTypes';

export default ({ dispatch }) => (next) => (action) => {
  const { type, payload } = action;

  if (
    type === T.SAVE_TDIAGRAM_REQUESTED ||
    type === T.CREATE_TDIAGRAM_REQUESTED
  ) {
    const { name, items } = payload;
    items?.map((item) => {
      if (item.coords.x < 0) // Coord x min
        item.coords.x = 0;
      if (item.coords.y < 0) // Coord y min
        item.coords.y = 0;
      if (item.note) item.note = '';
      if (item.text) item.text = '';
      return item;
    });
  }

  return next(action);
};
