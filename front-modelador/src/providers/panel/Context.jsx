import React from 'react';

export const Context = React.createContext({
  indexPanel: 0,
});
Context.displayName = 'PanelContext';

export default Context;
