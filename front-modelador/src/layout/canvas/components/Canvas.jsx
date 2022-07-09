import React, { createRef, useRef } from 'react';

import { useWindowSize } from '@hooks';
import { useCurrentWork, useSnackbar } from '@providers';

import { ELEMENT, ASSOCIATION } from '@layout/canvas/lib';
import { getLineAttributes } from '@libs'; // @todo change this method

import { default as Association } from '@layout/canvas/components/Association';
import { default as Element } from '@layout/canvas/components/Element';
import { default as Guideline } from '@layout/canvas/components/Guideline';

const MODULE_NAME = 'Canvas';
const Canvas = () => {
  const itemsRef = useRef([]);
  const { workItems: items, findItemByConns } = useCurrentWork();
  const { snackbar } = useSnackbar();
  const [width, height] = useWindowSize();

  if (itemsRef?.current?.length !== items.length) {
    itemsRef.current = Array(items.length)
      .fill()
      .map((_, i) => itemsRef.current[i] || createRef());
  }

  const drawItems = () => {
    try {
      if (items.length > 0) {
        return items.map((item, i) => {
          if (item.type?.includes(ELEMENT.KEY)) {
            const { id, type, note, text, coords, connections } = item;
            return (
              <Element
                key={id}
                ref={itemsRef?.current[i]}
                id={id}
                type={type}
                coords={coords}
                connections={connections}
                note={note}
                text={text}
              />
            );
          } else if (item.type?.includes(ASSOCIATION.KEY)) {
            const { id, type, note, text, connections } = item;
            const item1 = findItemByConns({ i: 0, connections });
            const item2 = findItemByConns({ i: 1, connections });

            if (item1 && item2) {
              const { x1, y1, x2, y2, textLen } = getLineAttributes(
                item1,
                item2,
                item
              );

              return (
                <Association
                  key={id}
                  ref={itemsRef?.current[i]}
                  id={id}
                  type={type}
                  coords={{ x1, y1, x2, y2, text: textLen }}
                  connections={connections}
                  note={note}
                  text={text}
                />
              );
            } else {
              throw new Error('There are association with only one connection');
            }
          } else {
            throw new Error('There are correpted items');
          }
        });
      }
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  return (
    <svg
      id="canvas"
      draggable={false}
      stroke={'#000'}
      strokeWidth={2}
      fill={'none'}
      height={height}
      width={width}
    >
      {drawItems()}
      <Guideline />
    </svg>
  );
};

Canvas.propTypes = {};
Canvas.defaultProps = {};

export default Canvas;
