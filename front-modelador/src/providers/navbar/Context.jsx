import React from 'react';

export const Context = React.createContext({
  navItemIndex: 0,
  setNavItemIndex: (tab) => {},
});
Context.displayName = 'SubheaderContext';

export default Context;
