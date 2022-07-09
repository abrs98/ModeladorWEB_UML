import React from 'react';

export const Context = React.createContext({
  id: null,
  type: null,
  coords: { x: 0, y: 0 },
  connections: [],
  note: null,
  text: null,
  active: false,
  noteActive: false,
  textActive: false,
  ref: null,
});
Context.displayName = 'ItemContext';

export default Context;
