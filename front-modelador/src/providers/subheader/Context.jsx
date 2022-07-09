import React from 'react';

export const Context = React.createContext({
  tabIndex: 0,
  onChangeTab: (tab) => {},
});
Context.displayName = 'SubheaderContext';

export default Context;
