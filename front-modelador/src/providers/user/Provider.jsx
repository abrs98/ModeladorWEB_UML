import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import { default as Context } from '@providers/user/Context';
import { findUser } from '@services/user/actions';

const Provider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    getIdTokenClaims,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const checkAuth = () => {
    const { email, name } = user;
    dispatch(findUser({ email, name }));
  };

  return (
    <Context.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        getIdTokenClaims,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
        checkAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {
  mocked: false,
};

export default Provider;
