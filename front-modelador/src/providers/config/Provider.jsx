import React from 'react';
import { default as PropTypes } from 'prop-types';
import { default as Context } from './Context';

const Provider = ({ appConfig, children }) => {
  return (
    <Context.Provider
      value={{
        appConfig,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
  appConfig: PropTypes.any,
};

export default Provider;
