/* eslint-disable indent */
import * as T from '@services/diagram/actionsTypes';

const initialState = {
  id: '',
  name: 'New diagram',
  diagrams: [],
  isSaved: false,
  isLoading: false,
  error: null,
};

const diagramReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.SET_DIAGRAMS:
      return { ...state, diagrams: payload.diagrams };

    /*************** PENDING CASES ***************/
    case T.SAVE_DIAGRAM_PENDING:
    case T.SAVE_NEW_DIAGRAM_PENDING:
    case T.DIAGRAMS_PENDING:
    case T.DELETE_DIAGRAM_PENDING:
    case T.UPDATE_DIAGRAM_PENDING:
      return { ...state, isLoading: true, error: null };

    /*************** SUCESS CASES ***************/
    case T.SAVE_DIAGRAM_SUCCESS:
    case T.DELETE_DIAGRAM_SUCCESS:
    case T.UPDATE_DIAGRAM_SUCCESS:
      return { ...state, isSaved: true, isLoading: false, error: null };
    case T.SAVE_NEW_DIAGRAM_SUCCESS:
      return {
        ...state,
        id: payload.diagram.id,
        name: payload.diagram.name,
        isSaved: true,
        isLoading: false,
        error: null,
      };
    case T.DIAGRAMS_RECEIVED:
      return {
        ...state,
        diagrams: payload.diagrams,
        isSaved: true,
        isLoading: false,
        error: null,
      };

    /*************** FAILED CASES ***************/
    case T.SAVE_DIAGRAM_FAILED:
    case T.SAVE_NEW_DIAGRAM_FAILED:
    case T.DELETE_DIAGRAM_FAILED:
    case T.UPDATE_DIAGRAM_FAILED:
      return {
        ...state,
        isSaved: true,
        isLoading: false,
        error: payload.error,
      };
    case T.DIAGRAMS_REQUEST_FAILED:
      return {
        ...state,
        diagrams: [],
        isSaved: true,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default diagramReducer;
