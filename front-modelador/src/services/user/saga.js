import { takeEvery, call, put } from 'redux-saga/effects';
import * as T from '@services/user/actionsTypes';
import * as api from '@services/user/api';

export function* findUserWatcher() {
  yield takeEvery(T.FIND_OR_CREATE_USER_REQUESTED, findUser);
}
function* findUser({ payload: { email, name } }) {
  yield put({ type: T.FIND_OR_CREATE_USER_PENDING });
  try {
    const { data, status } = yield call(api.findUser, { email });
    const userFound = data?.data;

    if (userFound.length !== 0 && status === 200) {
      yield put({ type: T.FIND_OR_CREATE_USER_SUCCESS, payload: { email, name } });
    } else {
      const { data, status } = yield call(api.createUser, { email, name });
      const user = data?.data;

      if (user && status === 200) {
        yield put({ type: T.FIND_OR_CREATE_USER_SUCCESS, payload: { email, name } });
      }
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error(e);
    yield put({ type: T.FIND_OR_CREATE_USER_FAILED, payload: { error: e } });
  }
}
