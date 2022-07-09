import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { default as PropTypes } from 'prop-types';

import { useUser } from '@providers';
import { default as CircularLoading } from '@layout/common/components/CircularLoading';

const PrivateRoute = ({ component, ...rest }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useUser();

  return (
    <>
      {isLoading ? (
        <CircularLoading />
      ) : (
        <Route
          {...rest}
          render={() => {
            return isAuthenticated ? (
              component
            ) : (
              <Redirect to={loginWithRedirect()} />
            );
          }}
        />
      )}
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};
PrivateRoute.defaultProps = {};

export default PrivateRoute;
