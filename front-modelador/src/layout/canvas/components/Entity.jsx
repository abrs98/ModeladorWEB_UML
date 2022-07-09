import React from 'react';
import { default as PropTypes } from 'prop-types';

import { useEntityStyles } from '@layout/canvas/styles';

const SCALE = 1.25;
const SELECTOR_XOFFSET = 2.75;
const SELECTOR_YOFFSET = 0;

const Entity = ({ position }) => {
  const classes = useEntityStyles();

  return (
    <>
      <circle
        className={classes.cls}
        cx={position.x - SELECTOR_XOFFSET}
        cy={position.y - SELECTOR_YOFFSET}
        r={15 * SCALE}
      />
      <line
        className={classes.rect}
        x1={position.x + 13 * SCALE} // len
        y1={position.y + 15 * SCALE} // y
        x2={position.x - 17 * SCALE} // len
        y2={position.y + 15 * SCALE} // y
      />
    </>
  );
};

Entity.propTypes = {
  position: PropTypes.object.isRequired,
};
Entity.defaultProps = {};

export default Entity;
