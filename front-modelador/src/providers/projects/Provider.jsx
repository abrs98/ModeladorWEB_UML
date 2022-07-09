import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/projects/Context';
import { deleteDiagramByProject } from '@services/diagram/actions';
import {
  getProject,
  setProjects,
  createProject,
  updateProject,
  removeProject,
  addMember,
  removeMember,
} from '@services/project/actions';
import { setModal } from '@services/ui/actions';
import config from '@config';
import * as C from '@constants';

const Provider = ({ children }) => {
  const { projects } = useSelector((store) => store.project);
  const dispatch = useDispatch();

  const getOneById = ({ id }) => {
    dispatch(getProject({ id }));
  };

  const create = ({ name }) => {
    dispatch(createProject({ name }));
  };

  const update = ({ id, name }) => {
    dispatch(updateProject({ id, name }));
  };

  const remove = ({ id }) => {
    dispatch(removeProject({ id }));
  };

  const addColab = ({ id, email }) => {
    dispatch(addMember({ id, email }));
  };

  const removeColab = ({ id, email }) => {
    dispatch(removeMember({ id, email }));
  };

  const saveNewDiagramByProject = ({ id }) => {
    config?.modal?.forEach(({ parent, type, data }) => {
      if (parent?.includes(C.PROJECTS_PANEL_ACTS_SAVEDIAGRAM)) {
        dispatch(
          setModal({
            id: parent,
            open: true,
            type,
            data: { ...data, projectId: id },
          })
        );
      }
    });
  };

  const removeDiagram = ({ id, projectId }) => {
    dispatch(deleteDiagramByProject({ id, projectId }));
  };

  return (
    <Context.Provider
      value={{
        projects,
        getOneById,
        create,
        update,
        remove,
        addColab,
        removeColab,
        saveNewDiagramByProject,
        removeDiagram,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {};

export default Provider;
