import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/currentWork/Context';
import {
  resetWork,
  setWorkName,
  setProjectProps,
  replaceWork,
  updatingAssociationIds,
  addItem,
  updateItem,
  setCurrSelect as updateCurrSelect,
  setLastSelect as updateLastSelect,
} from '@services/currentWork/actions';
import { setItemDto } from '@services/itemProperties/actions';
import {
  RobustnessElement,
  RobustnessAssociation,
  RobustnessItemMapper,
} from '@layout/canvas/lib';

const Provider = ({ children }) => {
  const {
    id,
    name,
    items,
    currSelect,
    lastSelect,
    projectId,
    isProject,
    isSaved,
  } = useSelector((store) => store?.currentWork);
  /*const [currSelect, setCurrSelect] = useState({
    id: null,
    type: null,
    connections: null,
  });
  const [lastSelect, setLastSelect] = useState({
    id: null,
    type: null,
    connections: null,
  });*/
  const dispatch = useDispatch();

  const setCurrSelect = (currSelect) => {
    dispatch(updateCurrSelect({ currSelect }));
  };

  const setLastSelect = (lastSelect) => {
    dispatch(updateLastSelect({ lastSelect }));
  };

  const setCurrentWorkName = ({ name }) => {
    resetSelections();
    dispatch(setWorkName({ name }));
  };

  const replaceCurrentWork = ({ id, name, items }) => {
    cleanCurrentWork();
    dispatch(replaceWork({ id, name, items }));
  };

  const replaceCurrentWorkAsProject = ({ diagram: { id, name, items }, projectId }) => {
    cleanCurrentWork();
    dispatch(replaceWork({ id, name, items }));
    dispatch(setProjectProps({ projectId }));
  };

  const replaceCurrentWorkByTemplate = ({ name, items }) => {
    cleanCurrentWork();
    dispatch(replaceWork({ id: null, name, items }));
  };

  const cleanCurrentWork = () => {
    dispatch(resetWork());
  };

  const addNewItem = (item) => {
    dispatch(addItem(item));
  };

  const addElement = ({ type, coords }) => {
    const element = new RobustnessElement(type, coords);
    dispatch(addItem(element));
  };

  const addAssociation = ({ type, from, to }) => {
    const association = new RobustnessAssociation(type, from, to);
    dispatch(updatingAssociationIds(association?.connections));
    dispatch(addItem(association));
  };

  const updateExistingItem = ({ id, coords }) => {
    const item = findItemById({ id });
    item.coords = coords;
    dispatch(setItemDto(RobustnessItemMapper.toDTO(item)));
    dispatch(updateItem(item));
  };

  const cleanCurrSelect = () => {
    setCurrSelect({ id: null, type: null, connections: null });
  };

  const cleanLastSelect = () => {
    setLastSelect({ id: null, type: null, connections: null });
  };

  const hasCurrSelect = () => {
    return currSelect.id && currSelect.type;
  };

  const resetSelections = () => {
    cleanCurrSelect();
    cleanLastSelect();
  };

  const findItemById = ({ id }) => {
    return items.find((item) => item.id === id);
  };

  const findItemByConns = ({ i, connections }) => {
    return items.find((item) => item.id === connections[i]);
  };

  const setActualItem = ({ id }) => {
    const item = findItemById({ id });
    const { type, connections } = item;
    dispatch(setItemDto(item));
    setCurrSelect({ id, type, connections });
  };

  return (
    <Context.Provider
      value={{
        workId: id,
        workName: name,
        workItems: items,
        workProjectId: projectId,
        workIsProject: isProject,
        workIsSaved: isSaved,
        currSelect,
        lastSelect,
        setCurrentWorkName,
        replaceCurrentWork,
        replaceCurrentWorkAsProject,
        replaceCurrentWorkByTemplate,
        cleanCurrentWork,
        addNewItem,
        addElement,
        addAssociation,
        updateExistingItem,
        setCurrSelect,
        setLastSelect,
        cleanCurrSelect,
        cleanLastSelect,
        hasCurrSelect,
        resetSelections,
        findItemById,
        findItemByConns,
        setActualItem,
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
