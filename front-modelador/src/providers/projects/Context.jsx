import React from 'react';

export const Context = React.createContext({
  projects: [],
});
Context.displayName = 'ProjectsContext';

export default Context;
