import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from './Context';
import { changeActiveTab, setIndexPanel } from '@services/ui/actions';

const Provider = ({ children }) => {
  const { tabIndex } = useSelector((store) => store.ui);
  const dispatch = useDispatch();

  const onChangeTab = (tabIndex) => {
    dispatch(changeActiveTab(tabIndex));
    let panelindex = tabIndex === 0 ? 1 : 0;
    // Se puede cambiar de panel solo si se esta en el tab File
    if(panelindex===0){
    dispatch(setIndexPanel(panelindex));
    }
  };

  return (
    <Context.Provider value={{ tabIndex, onChangeTab }}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {};

export default Provider;
