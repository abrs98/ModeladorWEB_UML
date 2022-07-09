import React from 'react';

export const Context = React.createContext({
  data: null,
  setData: (data) => {},
});
Context.displayName = 'SidebarContext';

export default Context;
