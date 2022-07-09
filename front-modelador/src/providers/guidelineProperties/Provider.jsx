import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/guidelineProperties/Context';
import * as actions from '@services/guidelineProperties/actions';

const Provider = ({ children }) => {
  const guidelineProperties = useSelector((store) => store.guidelineProperties);
  const dispatch = useDispatch();

  const setGuidelinePosition0 = (x0, y0) => {
    dispatch(actions.setGuidelinePosition0(x0, y0));
  };

  const setGuidelineActive = () => {
    dispatch(actions.setGuidelineActive());
  };

  const setGuidelineInactive = () => {
    dispatch(actions.setGuidelineInactive());
  };

  const setGuidelineProperties = (properties) => {
    dispatch(actions.setGuidelineProperties(properties));
  };

  const setDefaultGuidelineState = () => {
    dispatch(actions.setDefaultGuidelineState());
  };

  return (
    <Context.Provider
      value={{
        guideline: guidelineProperties,
        setGuidelinePosition0,
        setGuidelineActive,
        setGuidelineInactive,
        setGuidelineProperties,
        setDefaultGuidelineState,
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
