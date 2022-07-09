/* eslint-disable indent */
import * as T from '@services/user/actionsTypes';

const initialState = {
  email: '',
  name: '',
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.FIND_OR_CREATE_USER_PENDING:
      return { ...state, isLoading: true, error: null };

    case T.FIND_OR_CREATE_USER_SUCCESS:
      return {
        ...state,
        email: payload.email,
        name: payload.name,
        isLoading: false,
        error: null,
      };

    case T.FIND_OR_CREATE_USER_FAILED:
      return { ...state, isLoading: false, error: payload.error };

    default:
      return state;
  }
};

export default userReducer;
