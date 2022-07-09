import React, { useState } from 'react';
import { default as PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { default as Context } from '@providers/sidebar/Context';
import { setProject } from '@services/project/actions';

const Provider = ({ children }) => {
  const { project } = useSelector((store) => store.project);
  const [inputVal, setInputVal] = useState('');
  const dispatch = useDispatch();

  const removeProject = () => {
    dispatch(setProject({ project: null }));
  };

  return (
    <Context.Provider
      value={{
        project,
        inputVal,
        removeProject,
        setInputVal
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
