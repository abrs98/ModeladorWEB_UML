import React from 'react';
import { useSelector } from 'react-redux';

import { useMousePosition } from '@hooks';
import { useGuidelineProps } from '@providers';
import { ASSOCIATION } from '@layout/canvas/lib';

const Guideline = () => {
  const { itemType } = useSelector((store) => store.ui);
  const { mouseLocal } = useMousePosition();
  const { guideline } = useGuidelineProps();

  return (
    <>
      {guideline.active && itemType?.includes(ASSOCIATION.KEY) && (
        <line
          stroke={'#00b1ff'}
          strokeDasharray={'10, 10'}
          strokeWidth={2}
          x1={mouseLocal.x}
          y1={mouseLocal.y}
          x2={guideline.x0}
          y2={guideline.y0}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        />
      )}
    </>
  );
};

Guideline.propTypes = {};
Guideline.defaultProps = {};

export default Guideline;
