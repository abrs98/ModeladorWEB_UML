import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/panel/Context';
import { setIndexPanel as setPanel } from '@services/ui/actions';
import { changeActiveTab as changeActiveTab } from '@services/ui/actions';
import * as C from '@constants/panel';

const Provider = ({ children }) => {
  const { indexPanel } = useSelector((store) => store?.ui);
  const dispatch = useDispatch();

  const setIndexPanel = (index) => {
    //Cambia el tab activo cuando se regresa a Home
    let tabindex = index === 0 ? 1 : 0;
    dispatch(changeActiveTab(tabindex));
    dispatch(setPanel(index));
    
   
  };

  const goToMainPanel = () => {
    setIndexPanel(C.MAIN_PANEL_INDEX);
  };

  const goToProjectsPanel = () => {
    setIndexPanel(C.PROJECTS_PANEL_INDEX);
  };

  const goToTemplatesPanel = () => {
    setIndexPanel(C.TEMPLATES_PANEL_INDEX);
  };

  const goToDiagramsPanel = () => {
    setIndexPanel(C.DIAGRAMS_PANEL_INDEX);
  };

  return (
    <Context.Provider
      value={{
        indexPanel,
        goToMainPanel,
        goToProjectsPanel,
        goToTemplatesPanel,
        goToDiagramsPanel,
        setIndexPanel,
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
