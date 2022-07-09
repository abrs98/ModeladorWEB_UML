import React from 'react';

export const Context = React.createContext({
  snackbar: ({ module, msj, variant, ...other }) => {},
});
Context.displayName = 'SnackbarContext';

export default Context;
