import { all } from 'redux-saga/effects';
import * as diagram from '@services/diagram/saga';
import * as project from '@services/project/saga';
import * as tdiagram from '@services/template/saga';
import * as ui from '@services/ui/saga';
import * as user from '@services/user/saga';

export default function* rootSaga() {
  yield all([
    diagram.saveDiagramWatcher(),
    diagram.saveNewDiagramWatcher(),
    diagram.saveNewDiagramByProjectWatcher(),
    diagram.fetchDiagramsWatcher(),
    diagram.updateDiagramWatcher(),
    diagram.deleteDiagramWatcher(),
    diagram.deleteDiagramByProjectWatcher(),
    project.fetchProjectsWatcher(),
    project.fetchProjectWatcher(),
    project.createProjectWatcher(),
    project.updateProjectWatcher(),
    project.removeProjectWatcher(),
    project.addMemberWatcher(),
    project.removeMemberWatcher(),
    tdiagram.fetchTDiagramsWatcher(),
    tdiagram.createTDiagramWatcher(),
    tdiagram.updateTDiagramWatcher(),
    tdiagram.removeTDiagramWatcher(),
    ui.modalApproveWatcher(),
    user.findUserWatcher(),
  ]);
}
