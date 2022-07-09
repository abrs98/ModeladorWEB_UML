import React from 'react';
import { default as PropTypes } from 'prop-types';

import { useControlStyles } from '@layout/canvas/styles';

const SCALE = 1.25;
const SELECTOR_XOFFSET = 2.75;
const SELECTOR_YOFFSET = 0;

const Control = ({ position }) => {
  const classes = useControlStyles();

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
        x1={position.x + 3 * SCALE} // len - 7
        y1={position.y - 19 * SCALE} // 25
        x2={position.x - 2 * SCALE} // 0
        y2={position.y - 15 * SCALE} // 19
      />
      <line
        className={classes.rect}
        x1={position.x - 2 * SCALE} // 0
        y1={position.y - 15 * SCALE} // 19
        x2={position.x + 3 * SCALE} // len - 7
        y2={position.y - 10 * SCALE} // 8 - 13
      />
    </>
  );
};

Control.propTypes = {
  position: PropTypes.object.isRequired,
};
Control.defaultProps = {};

export default Control;
