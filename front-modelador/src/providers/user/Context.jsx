import React from 'react';

export const Context = React.createContext({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  getIdTokenClaims: () => {},
  getAccessTokenSilently: () => {},
  loginWithRedirect: () => {},
  logout: () => {},
  checkAuth: () => {},
});
Context.displayName = 'UserContext';

export default Context;
