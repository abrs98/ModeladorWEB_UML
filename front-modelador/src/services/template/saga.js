import { takeEvery, select, call, put } from 'redux-saga/effects';
import {
  tdiagramsPending,
  tdiagramsReceived,
  tdiagramsRequestFailed,
  createTDiagramPending,
  createTDiagramSuccess,
  createTDiagramFailed,
  updateTDiagramPending,
  updateTDiagramSuccess,
  updateTDiagramFailed,
  removeTDiagramPending,
  removeTDiagramSuccess,
  removeTDiagramFailed,
} from '@services/template/actions';
import { enqueueSnackbar } from '@services/notification/actions';
import * as T from '@services/template/actionsTypes';
import * as api from '@services/template/api';

const DEVELOPMENT = 'development';

export function* fetchTDiagramsWatcher() {
  yield takeEvery(T.TDIAGRAMS_REQUESTED, fetchTDiagrams);
}
function* fetchTDiagrams(action) {
  yield put(tdiagramsPending());
  try {
    const {
      user: { email },
    } = yield select();
    const { data, status } = yield call(api.getTDiagrams, { email });
    const tdiagrams = data?.data?.map((tdiagram) => {
      if (!Array.isArray(tdiagram?.items)) {
        tdiagram.items = JSON.parse(tdiagram?.items);
      }
      return tdiagram;
    });

    if (tdiagrams && status === 200) {
      if (process.env.NODE_ENV === DEVELOPMENT) {
        yield put(enqueueSnackbar({
          message: 'DEBUG: Fetched templates success',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
          },
        }));
      }
      yield put(tdiagramsReceived({ tdiagrams }));
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Can\'t to fetching templates, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put(tdiagramsRequestFailed({ error: e }));
  }
}

export function* createTDiagramWatcher() {
  yield takeEvery(T.CREATE_TDIAGRAM_REQUESTED, createDiagram);
}
function* createDiagram({ payload: { name, items } }) {
  yield put(createTDiagramPending());
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { email, tdiagram: { name, items } };
    const { data, status } = yield call(api.createTDiagramByUser, payload);
    const tdiagram = data?.data;

    if (tdiagram && status === 200) {
      yield put(enqueueSnackbar({
        message: 'Created template success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put(createTDiagramSuccess());
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Can\'t to save template, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put(createTDiagramFailed({ error: e }));
  }
}

export function* updateTDiagramWatcher() {
  yield takeEvery(T.UPDATE_TDIAGRAM_REQUESTED, updateTDiagram);
}
function* updateTDiagram({ payload: { id, ...rest } }) {
  yield put(updateTDiagramPending());
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { id, email, tdiagram: { ...rest } };
    const { status } = yield call(api.updateTDiagramByUser, payload);

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Updated template success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put(updateTDiagramSuccess());
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Can\'t to updating template, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put(updateTDiagramFailed({ error: e }));
  }
}

export function* removeTDiagramWatcher() {
  yield takeEvery(T.REMOVE_TDIAGRAM_REQUESTED, removeTDiagram);
}
function* removeTDiagram({ payload: { id } }) {
  yield put(removeTDiagramPending());
  try {
    const {
      user: { email },
    } = yield select();
    const { status } = yield call(api.removeTDiagramByUser, { id, email });

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Removed template success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put(removeTDiagramSuccess());
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Can\'t to deleting template, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put(removeTDiagramFailed({ error: e }));
  }
}
