import { takeEvery, select, call, put } from 'redux-saga/effects';
import * as T from '@services/diagram/actionsTypes';
import { saveWork, setProjectProps } from '@services/currentWork/actions';
import {
  saveNewDiagramPending,
  saveNewDiagramSuccess,
  saveNewDiagramFailed,
} from '@services/diagram/actions';
import { createDiagramInProject, removeDiagramInProject } from '@services/project/actions'
import { enqueueSnackbar } from '@services/notification/actions';
import * as api from '@services/diagram/api';

const DEVELOPMENT = 'development';

/**
 * Save diagram
 * It is used to save an list of local items from the diagram.
 */
export function* saveDiagramWatcher() {
  yield takeEvery(T.SAVE_DIAGRAM_REQUESTED, saveDiagram);
}
function* saveDiagram(action) {
  yield put({ type: T.SAVE_DIAGRAM_PENDING });
  try {
    const {
      currentWork: { id, name, items, projectId, isProject },
      user: { email },
    } = yield select();
    let payload = null;
    if (isProject) {
      payload = { id, projectId, diagram: { name, items } };
    } else {
      payload = { id, userEmail: email, diagram: { name, items } };
    }
    const { status } = yield call(api.updateDiagram, payload);

    if (status === 204) {
      yield put(saveWork({ id }));
      yield put(enqueueSnackbar({
        message: 'Saved success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error saving diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.SAVE_DIAGRAM_FAILED, payload: { error: e } });
  }
}

export function* saveNewDiagramWatcher() {
  yield takeEvery(T.SAVE_NEW_DIAGRAM_REQUESTED, saveNewDiagram);
}
function* saveNewDiagram({ payload: { name, items } }) {
  yield put(saveNewDiagramPending());
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { userEmail: email, diagram: { name, items } };
    const { data, status } = yield call(api.createDiagram, payload);
    const diagram = data?.data;

    if (diagram && status === 200) {
      yield put(saveWork({ id: diagram?.id }));
      yield put(enqueueSnackbar({
        message: 'Saved success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error saving diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.SAVE_NEW_DIAGRAM_FAILED, payload: { error: e } });
  }
}

export function* saveNewDiagramByProjectWatcher() {
  yield takeEvery(T.SAVE_NEW_DIAGRAM_BY_PROJECT_REQUESTED, saveNewDiagramByProject);
}
function* saveNewDiagramByProject({ payload: { id, name, items } }) {
  yield put(saveNewDiagramPending());
  try {
    const payload = { projectId: id, diagram: { name, items } };
    const { data, status } = yield call(api.createDiagram, payload);
    const diagram = data?.data;
    if (!Array.isArray(diagram?.items)) {
      diagram.items = JSON.parse(diagram.items);
    }

    if (diagram && status === 200) {
      yield put(saveWork({ id: diagram?.id }));
      yield put(setProjectProps({ projectId: id }));
      yield put(createDiagramInProject({ projectId: id, diagram: { id: diagram.id, name: diagram.name, items: diagram.items } }));
      yield put(enqueueSnackbar({
        message: 'Saved success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error saving diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.SAVE_NEW_DIAGRAM_FAILED, payload: { error: e } });
  }
}

export function* fetchDiagramsWatcher() {
  yield takeEvery(T.DIAGRAMS_REQUESTED, fetchDiagrams);
}
function* fetchDiagrams(action) {
  yield put({ type: T.DIAGRAMS_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const { data, status } = yield call(api.getDiagrams, { email });
    const diagrams = data?.data?.map((diagram) => {
      if (!Array.isArray(diagram?.items)) {
        diagram.items = JSON.parse(diagram?.items);
      }
      return diagram;
    });

    if (diagrams && status === 200) {
      if (process.env.NODE_ENV === DEVELOPMENT) {
        yield put(enqueueSnackbar({
          message: 'DEBUG: Fetched diagrams success',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
          },
        }));
      }
      yield put({ type: T.DIAGRAMS_RECEIVED, payload: { diagrams } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error fetching diagrams, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.DIAGRAMS_REQUEST_FAILED, payload: { error: e } });
  }
}

export function* deleteDiagramWatcher() {
  yield takeEvery(T.DELETE_DIAGRAM_REQUESTED, deleteDiagram);
}
function* deleteDiagram({ payload: { id } }) {
  yield put({ type: T.DELETE_DIAGRAM_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const { status } = yield call(api.deleteDiagramByUser, { id, email });

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Removed diagram success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.DELETE_DIAGRAM_SUCCESS });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error deleting diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.DELETE_DIAGRAM_FAILED, payload: { error: e } });
  }
}

export function* deleteDiagramByProjectWatcher() {
  yield takeEvery(T.DELETE_DIAGRAM_BY_PROJECT_REQUESTED, deleteDiagramByProject);
}
function* deleteDiagramByProject({ payload: { id, projectId } }) {
  yield put({ type: T.DELETE_DIAGRAM_PENDING });
  try {
    const { status } = yield call(api.deleteDiagramByProject, { id, projectId });

    if (status === 204) {
      yield put(removeDiagramInProject({ projectId, diagramId: id }));
      yield put(enqueueSnackbar({
        message: 'Removed diagram success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.DELETE_DIAGRAM_SUCCESS });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error deleting diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.DELETE_DIAGRAM_FAILED, payload: { error: e } });
  }
}

export function* updateDiagramWatcher() {
  yield takeEvery(T.UPDATE_DIAGRAM_REQUESTED, updateDiagram);
}
function* updateDiagram({ payload: { id, name, items } }) {
  yield put({ type: T.UPDATE_DIAGRAM_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { id, email, diagram: { name, items } };
    const { status } = yield call(api.updateDiagramByUser, payload);

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Updated diagram success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.UPDATE_DIAGRAM_SUCCESS });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Error deleting diagram, try again!',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
      },
    }));
    yield put({ type: T.UPDATE_DIAGRAM_FAILED, payload: { error: e } });
  }
}
