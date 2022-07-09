import { takeEvery, select, put } from 'redux-saga/effects';
import * as T from '@services/ui/actionsTypes';
import { setWorkName, resetWork } from '@services/currentWork/actions';
import { saveNewDiagram, saveNewDiagramByProject } from '@services/diagram/actions';
import {
  getProjects,
  addMember,
  removeMember,
} from '@services/project/actions';
import { setDefaultItemState } from '@services/itemProperties/actions';
import { saveAsTDiagram } from '@services/template/actions';
import { disposeModal } from '@services/ui/actions';
import * as C from '@constants';

export function* modalApproveWatcher() {
  yield takeEvery(T.APPROVE_MODAL, modalApprove);
}
function* modalApprove({ payload: { data } }) {
  const {
    currentWork: { items },
    ui: { modalParentId },
  } = yield select();
  if (modalParentId === C.NAV_NEW_DIAGRAM) {
    yield put(resetWork());
    yield put(setDefaultItemState());
  } else if (modalParentId === C.NAV_SAVE_DIAGRAM) {
    const { inputValue } = data;
    yield put(setWorkName({ name: inputValue }));
    yield put(saveNewDiagram({ name: inputValue, items }));
  } else if (modalParentId === C.MENU_SAVE_AS_TEMPLATE) {
    const { inputValue } = data;
    yield put(setWorkName({ name: inputValue }));
    yield put(saveAsTDiagram({ name: inputValue, items }));
  } else if (modalParentId === C.PROJECTS_PANEL_ACTS_SAVEDIAGRAM) {
    const { projectId, inputValue } = data;
    yield put(setWorkName({ name: inputValue }));
    yield put(saveNewDiagramByProject({ id: projectId, name: inputValue, items }));
  }
  yield put(disposeModal());
}
