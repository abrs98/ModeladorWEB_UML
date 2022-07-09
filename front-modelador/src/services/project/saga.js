import { takeEvery, select, call, put } from 'redux-saga/effects';
import { enqueueSnackbar } from '@services/notification/actions';
import * as T from '@services/project/actionsTypes';
import * as api from '@services/project/api';

const DEVELOPMENT = 'development';

export function* fetchProjectsWatcher() {
  yield takeEvery(T.PROJECTS_REQUESTED, fetchProjects);
}
function* fetchProjects(action) {
  yield put({ type: T.PROJECTS_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const { data: { data, error }, status } = yield call(api.getProjects, { email });
    const projects = data?.map((project) => {
      const diagrams = project.diagrams.map((diagram) => {
        if (!Array.isArray(diagram?.items)) {
          diagram.items = JSON.parse(diagram?.items);
        }
        return diagram;
      });
      const updatedAt = new Date(project.updatedAt);
      return { ...project, diagrams, updatedAt: updatedAt.toLocaleString() };
    });

    if (projects && status === 200) {
      if (process.env.NODE_ENV === DEVELOPMENT) {
        yield put(enqueueSnackbar({
          message: 'DEBUG: Fetched projects success',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
          },
        }));
      }
      yield put({ type: T.PROJECTS_RECEIVED, payload: { projects } });
    } else {
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to fetching projects',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.PROJECTS_REQUEST_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: fetch projects',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.PROJECTS_REQUEST_FAILED, payload: { error: status } });
  }
}

export function* fetchProjectWatcher() {
  yield takeEvery(T.PROJECT_REQUESTED, fetchProject);
}
function* fetchProject({ payload: { id } }) {
  yield put({ type: T.PROJECT_PENDING });
  try {
    const { data: { data, error }, status } = yield call(api.getProjectById, { id });
    const project = data;

    if (project && status === 200) {
      if (process.env.NODE_ENV === DEVELOPMENT) {
        yield put(enqueueSnackbar({
          message: 'DEBUG: Fetched project success',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
          },
        }));
      }
      yield put({ type: T.PROJECT_RECEIVED, payload: { project } });
    } else {
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to fetching project',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.PROJECT_REQUEST_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: fetch project',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.PROJECT_REQUEST_FAILED, payload: { error: status } });
  }
}

export function* createProjectWatcher() {
  yield takeEvery(T.CREATE_PROJECT_REQUESTED, createProject);
}
function* createProject({ payload: { name } }) {
  yield put({ type: T.CREATE_PROJECT_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { email, name };
    const { data: { data, error }, status } = yield call(api.createProject, payload);
    const project = data;
    const updatedAt = new Date(project.updatedAt);
    project.updatedAt = updatedAt.toLocaleString();

    if (project && status === 200) {
      yield put(enqueueSnackbar({
        message: 'Created project success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.LOCAL_CREATE_PROJECT, payload: { project } });
      yield put({ type: T.CREATE_PROJECT_SUCCESS });
    } else {
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to creating project',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.CREATE_PROJECT_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: create project',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.CREATE_PROJECT_FAILED, payload: { error: e } });
  }
}

export function* updateProjectWatcher() {
  yield takeEvery(T.UPDATE_PROJECT_REQUESTED, updateProject);
}
function* updateProject({ payload: { id, name } }) {
  yield put({ type: T.UPDATE_PROJECT_PENDING });
  try {
    const {
      user: { email },
    } = yield select();
    const payload = { id, email, name };
    const { data, status } = yield call(api.updateProject, payload);

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Updated project success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.LOCAL_UPDATE_PROJECT, payload: { id, name } });
      yield put({ type: T.UPDATE_PROJECT_SUCCESS });
    } else {
      const { error } = data;
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to updating project',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.UPDATE_PROJECT_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: update project',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.UPDATE_PROJECT_FAILED, payload: { error: e } });
  }
}

export function* removeProjectWatcher() {
  yield takeEvery(T.REMOVE_PROJECT_REQUESTED, removeProject);
}
function* removeProject({ payload: { id } }) {
  yield put({ type: T.REMOVE_PROJECT_PENDING });
  try {
    const { data, status } = yield call(api.removeProject, { id });

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Removed project success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.LOCAL_REMOVE_PROJECT, payload: { id } });
      yield put({ type: T.REMOVE_PROJECT_SUCCESS });
    } else {
      const { error } = data;
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to removing project',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.REMOVE_PROJECT_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: remove project',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.REMOVE_PROJECT_FAILED, payload: { error: e } });
  }
}

export function* addMemberWatcher() {
  yield takeEvery(T.ADD_MEMBER_REQUESTED, addMember);
}
function* addMember({ payload: { id, email } }) {
  yield put({ type: T.ADD_MEMBER_PENDING });
  try {
    const { data, status } = yield call(api.addMember, { id, email });

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Added member success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.ADD_MEMBER_SUCCESS });
    } else {
      const error = status;
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to adding member',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.ADD_MEMBER_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: add member',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.ADD_MEMBER_FAILED, payload: { error: e } });
  }
}

export function* removeMemberWatcher() {
  yield takeEvery(T.REMOVE_MEMBER_REQUESTED, removeMember);
}
function* removeMember({ payload: { id, email } }) {
  yield put({ type: T.REMOVE_MEMBER_PENDING });
  try {
    const { data, status } = yield call(api.removeMember, { id, email });

    if (status === 204) {
      yield put(enqueueSnackbar({
        message: 'Removed member success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));
      yield put({ type: T.REMOVE_MEMBER_SUCCESS });
    } else if (status === 404) {
      const error = 'Collab no found';
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error: Collab no found',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.REMOVE_MEMBER_FAILED, payload: { error } });
    } else {
      const { error } = data;
      if (process.env.NODE_ENV === DEVELOPMENT) console.error(error);
      yield put(enqueueSnackbar({
        message: 'Error to removing member',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
        },
      }));
      yield put({ type: T.REMOVE_MEMBER_FAILED, payload: { error } });
    }
  } catch (e) {
    if (process.env.NODE_ENV === DEVELOPMENT) console.error(e);
    yield put(enqueueSnackbar({
      message: 'Fatal error: remove member',
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
      },
    }));
    yield put({ type: T.REMOVE_MEMBER_FAILED, payload: { error: e } });
  }
}
