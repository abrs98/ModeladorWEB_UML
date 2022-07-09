export const robustnessTypes = {
  CONTROL: 'CONTROL',
  BOUNDARY: 'BOUNDARY',
  ENTITY: 'ENTITY',
  ACTOR: 'ACTOR',

  LINE: {
    ASSOCIATION: 'LINE.ASSOCIATION',
    ASSOCIATION_NAV: 'LINE.ASSOCIATION_NAV',
    KEY: 'LINE',
  },

  MISC: {
    KEY: 'MISC',
    NOTE: 'MISC.NOTE',
  },
};

export const CONTROL = 'CONTROL';
export const BOUNDARY = 'BOUNDARY';
export const ENTITY = 'ENTITY';
export const ACTOR = 'ACTOR';

export const ELEMENT = {
  KEY: 'ELEMENT',
  CONTROL: 'ELEMENT.CONTROL',
  BOUNDARY: 'ELEMENT.BOUNDARY',
  ENTITY: 'ELEMENT.ENTITY',
  ACTOR: 'ELEMENT.ACTOR',
};
export const ASSOCIATION = {
  KEY: 'ASSOCIATION',
  SIMPLE: 'ASSOCIATION.SIMPLE',
  WITH_NAV: 'ASSOCIATION.WITH_NAV',
};
export const MISC = {
  KEY: 'MISC',
  NOTE: 'MISC.NOTE',
};

export default robustnessTypes;
