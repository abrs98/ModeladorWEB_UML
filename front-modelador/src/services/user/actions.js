import * as T from '@services/user/actionsTypes';

export const findUser = ({ email, name }) => ({
  type: T.FIND_OR_CREATE_USER_REQUESTED,
  payload: { email, name },
});
