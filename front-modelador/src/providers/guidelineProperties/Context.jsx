import React from 'react';

export const Context = React.createContext({
  x0: 0,
  y0: 0,
  active: false,
});
Context.displayName = 'GuidelinePropertiesContext';

export default Context;
