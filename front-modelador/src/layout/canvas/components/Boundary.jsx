import React from 'react';
import { default as PropTypes } from 'prop-types';

import { useBoundaryStyles } from '@layout/canvas/styles';

const SCALE = 1.25;

const Boundary = ({ position }) => {
  const classes = useBoundaryStyles();

  return (
    <>
      <circle
        className={classes.cls}
        cx={position.x}
        cy={position.y}
        r={15 * SCALE}
      />
      <rect
        className={classes.rect}
        x={position.x - 20 * SCALE}
        y={position.y}
        width={5 * SCALE}
        height={0.5} // grossor of rect
      />
      <rect
        className={classes.rect}
        x={position.x - 20 * SCALE}
        y={position.y - 10 * SCALE}
        width={0.5} // grossor of rect
        height={20 * SCALE}
      />
    </>
  );
};

Boundary.propTypes = {
  position: PropTypes.object.isRequired,
};
Boundary.defaultProps = {};

export default Boundary;
