/* eslint-disable indent */
import * as T from '@services/template/actionsTypes';

const initialState = {
  tdiagrams: [],
  isLoading: false,
  error: null,
};

const tdiagramReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.SET_TDIAGRAMS:
      return { ...state, tdiagrams: payload?.tdiagrams };

    // On pending
    case T.TDIAGRAMS_PENDING:
    case T.CREATE_TDIAGRAM_PENDING:
    case T.UPDATE_TDIAGRAM_PENDING:
    case T.REMOVE_TDIAGRAM_PENDING:
      return { ...state, isLoading: true, error: null };

    // On success
    case T.TDIAGRAMS_RECEIVED:
      return {
        ...state,
        isLoading: false,
        tdiagrams: payload.tdiagrams,
        error: null,
      };
    case T.CREATE_TDIAGRAM_SUCCESS:
    case T.UPDATE_TDIAGRAM_SUCCESS:
    case T.REMOVE_TDIAGRAM_SUCCESS:
      return { ...state, isLoading: false, error: null };

    // On failed
    case T.TDIAGRAMS_REQUEST_FAILED:
      return { tdiagrams: [], isLoading: false, error: payload.error };
    case T.CREATE_TDIAGRAM_FAILED:
    case T.UPDATE_TDIAGRAM_FAILED:
    case T.REMOVE_TDIAGRAM_FAILED:
      return { ...state, isLoading: false, error: payload.error };

    default:
      return state;
  }
};

export default tdiagramReducer;
