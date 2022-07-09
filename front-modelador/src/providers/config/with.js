import React from 'react';
import { default as Context } from './Context';
import { default as config } from '@config';

const withContainer = (Component) => {
  const ChildComponent = (props) => {
    return (
      <Context.Consumer>
        {(value) => {
          const { appConfig } = value || {};
          return (
            <Component appConfig={{ ...config, ...appConfig }} {...props} />
          );
        }}
      </Context.Consumer>
    );
  };

  return ChildComponent;
};

export default withContainer;
