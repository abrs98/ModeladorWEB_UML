import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { useInterval, usePointerCoords } from '@hooks';
import { useCurrentWork, useItem, useGuidelineProps, useSnackbar } from '@providers';
import { ASSOCIATION } from '@layout/canvas/lib';
import { default as SvgBuilder } from '@layout/canvas/components/SvgBuilder';
import { useElementStyles } from '@layout/canvas/styles';

const MODULE_NAME = 'Element';
const Element = forwardRef(
  ({ id, type, coords, connections, note, text }, ref) => {
    const classes = useElementStyles();
    const { itemType } = useSelector((store) => store.ui);
    const {
      currSelect, lastSelect,
      setCurrSelect, setLastSelect,
      cleanCurrSelect, setActualItem,
    } = useCurrentWork();
    const {
      item,
      position,
      fIStatus,
      setItemDto,
      setItemInactive,
      setPosition,
      setItemSelected,
      setFIStatus,
      isDifferentPosition,
    } = useItem();
    const {
      guideline,
      setGuidelineProperties,
      setDefaultGuidelineState,
    } = useGuidelineProps();
    const { snackbar } = useSnackbar();
    const { pointerGlobal, pointerLocal } = usePointerCoords();

    useInterval(() => {
      if (item.active && item.id === id && currSelect.id === id) {
        const positionEl = ref?.current?.getBoundingClientRect();
        setPosition(positionEl);
      }
    }, 10);

    const handlePointerDown = (e) => {
      try {
        if (guideline.active) {
          setDefaultGuidelineState();
        }
        if (itemType?.includes(ASSOCIATION.KEY)) {
          const { offsetX, offsetY } = window.event;
          setGuidelineProperties({ x0: offsetX, y0: offsetY, active: true });
        } else {
          setFIStatus(false);
          setItemSelected({
            id,
            type,
            coords,
            connections,
            note,
            text,
          });
        }
        e.stopPropagation();
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    const handlePointerMove = (e) => {
      try {
        if (item.active && item.id !== id) return;
        const positionEl = ref?.current?.getBoundingClientRect();
        if (isDifferentPosition({ positionEl })) {
          setPosition(positionEl);
        }

        // When select a input of item and then you try over same item.
        if (currSelect.id === id) { // @fix
          setFIStatus(false);
        }

        // When select a input of item and then you try to select another one.
        if (currSelect.id !== id && fIStatus) {
          setFIStatus(false);
          setActualItem({ id });
        }
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    const handlePointerEnter = (e) => {
      try {
        const positionEl = ref?.current?.getBoundingClientRect();
        if (isDifferentPosition({ positionEl })) {
          setPosition(positionEl);
        }
        setItemDto({
          id,
          type,
          coords,
          connections,
          note,
          text,
        });
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    const handleDoubleClick = () => {
      if (!id) return;
      try {
        const positionEl = ref?.current?.getBoundingClientRect();
        if (isDifferentPosition({ positionEl })) {
          setPosition(positionEl);
        }
        if (currSelect.id !== id) {
          setFIStatus(true);
        }
        setActualItem({ id });
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    return (
      <>
        <g>
          <SvgBuilder type={type} position={coords} />
          <text
            className={classes.text}
            x={coords?.x}
            y={coords?.y + 35 * item.scale} // align to bottom
            onDoubleClick={handleDoubleClick}
            style={{ display: currSelect.id === id && fIStatus ? 'none' : '' }}
          >
            {text ? text : '<No name>'}
          </text>
          <rect
            className={
              item.active && currSelect.id === id
                ? classes.selected
                : classes.deselected
            }
            id={id}
            rx={item.collision?.rectRound}
            ry={item.collision?.rectRound}
            x={coords?.x - 22.5 * item.scale}
            y={coords?.y - 20 * item.scale}
            width={item.collision?.size}
            height={item.collision?.size}
            ref={ref}
            fill={'#00000000'}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
          />
        </g>
      </>
    );
  }
);

Element.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  coords: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  note: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
Element.defaultProps = {
  id: 0,
  type: 'entity',
  coords: { x: 0, y: 0 },
  connections: [],
  note: 'First note',
  text: 'Text sample v1',
};
Element.displayName = 'Element';

export default Element;
