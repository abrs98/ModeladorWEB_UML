import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { useMousePosition, usePointerCoords, useWindowSize } from '@hooks';
import { useCurrentWork, useItem } from '@providers';

const WindowProperties = () => {
  const { pointerGlobal, pointerLocal } = usePointerCoords();
  const { mouseGlobal, mouseLocal } = useMousePosition();
  const [width, height] = useWindowSize();
  const { currSelect, lastSelect } = useCurrentWork();
  const { item } = useItem();

  return (
    <Box
      display="flex"
      position="fixed"
      flexDirection="column"
      right={0}
      zIndex={100}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      style={{
        pointerEvents: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      <Typography>
        Window size: {width} x {height}
      </Typography>
      <Typography>
        Click down global pos: {pointerGlobal.x} , {pointerGlobal.y}
      </Typography>
      <Typography>
        Click down local pos: {pointerLocal.x} , {pointerLocal.y}
      </Typography>
      <Typography>
        Mouse global pos: {mouseGlobal.x} , {mouseGlobal.y}
      </Typography>
      <Typography>
        Mouse local pos: {mouseLocal.x} , {mouseLocal.y}
      </Typography>
      <Typography>
        Current select: {currSelect.id || 'None'}
      </Typography>
      <Typography>
        Last select: {lastSelect.id || 'None'}
      </Typography>
      <Typography>
        ItemId: {item.id || 'None'}
      </Typography>
      <Typography>
        ItemActive: {item.active ? 'True' : 'False'}
      </Typography>
    </Box>
  );
};

WindowProperties.propTypes = {};
WindowProperties.defaultProps = {};

export default WindowProperties;
