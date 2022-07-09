import React from 'react';
import { default as PropTypes } from 'prop-types';

import { useActorStyles } from '@layout/canvas/styles';

const SCALE = 1.25;
const SELECTOR_XOFFSET = 2.75;
const SELECTOR_YOFFSET = 10;

const Actor = ({ position }) => {
  const classes = useActorStyles();

  return (
    <>
      <circle
        className={classes.cls} // Head
        cx={position.x - SELECTOR_XOFFSET}
        cy={position.y - SELECTOR_YOFFSET}
        r={8 * SCALE}
      />
      <line
        className={classes.rect} // Arms
        x1={position.x + 7 * SCALE} // len
        y1={position.y + 2 * SCALE} // y
        x2={position.x - 11 * SCALE} // len
        y2={position.y + 2 * SCALE} // y
      />
      <line
        className={classes.rect} // Body
        x1={position.x - 2.5 * SCALE}
        y1={position.y - 0.5 * SCALE}
        x2={position.x - 2.5 * SCALE}
        y2={position.y + 10 * SCALE}
      />
      <line
        className={classes.rect} // Rigth
        x1={position.x + 3.5 * SCALE}
        y1={position.y + 17 * SCALE}
        x2={position.x - 2.5 * SCALE}
        y2={position.y + 10 * SCALE}
      />
      <line
        className={classes.rect} // Left
        x1={position.x - 7.5 * SCALE}
        y1={position.y + 17 * SCALE}
        x2={position.x - 2.5 * SCALE}
        y2={position.y + 10 * SCALE}
      />
    </>
  );
};

Actor.propTypes = {
  position: PropTypes.object.isRequired,
};
Actor.defaultProps = {};

export default Actor;
