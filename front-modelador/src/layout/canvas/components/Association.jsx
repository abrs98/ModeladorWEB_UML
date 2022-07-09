import React, { forwardRef } from 'react';
import { default as PropTypes } from 'prop-types';

import { useInterval } from '@hooks';
import { useCurrentWork, useItem, useSnackbar } from '@providers';
import { ASSOCIATION } from '@layout/canvas/lib';
import { useAssociationStyles } from '@layout/canvas/styles';

const MODULE_NAME = 'Association';
const Association = forwardRef(
  ({ id, type, coords, connections, note, text }, ref) => {
    const classes = useAssociationStyles();
    const { currSelect, setActualItem } = useCurrentWork();
    const {
      item,
      fIStatus,
      setItemActive,
      setItemInactive,
      setPosition,
      isDifferentPosition,
      setFIStatus,
      setItemDto,
    } = useItem();
    const { snackbar } = useSnackbar();

    useInterval(() => {
      if (item.active && item.id === id) {
        const positionEl = ref?.current?.getBoundingClientRect();
        setPosition(positionEl);
      }
    }, 10);

    const handlePointerDown = (e) => {
      e.stopPropagation(); // avoid to click propagate to canvas
      if (!id) return;
      try {
        const positionEl = ref?.current?.getBoundingClientRect();
        if (isDifferentPosition({ positionEl })) {
          setPosition(positionEl);
        }
        setActualItem({ id });
        setItemDto({
          id,
          type,
          coords,
          connections,
          note,
          text,
        });
        setItemActive();
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    const handlePointerUp = (e) => {
      e.stopPropagation(); // avoid to click propagate to canvas
    };

    const handleDoubleClick = (e) => {
      e.stopPropagation(); // avoid to click propagate to canvas
      if (!id) return;
      try {
        const positionEl = ref?.current?.getBoundingClientRect();
        if (isDifferentPosition({ positionEl })) {
          setPosition(positionEl);
        }
        if (!fIStatus) {
          setFIStatus(true);
        }
      } catch (err) {
        const msj = 'Error in ' + MODULE_NAME;
        if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
        snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
      }
    };

    return (
      <g
        id={item.id}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleDoubleClick}
        ref={ref}
      >
        <defs>
          <marker
            id="ASSOCIATION_NAV"
            orient="auto"
            viewBox="0 0 8 5.5"
            markerWidth="7"
            markerHeight="7"
            refX="3"
            refY="3"
          >
            <path d="M0,0 V6 L3,3 Z" fill="#0A0500" />
          </marker>

          <marker
            id="ASSOCIATION_NAV_SELECTED"
            orient="auto"
            viewBox="0 0 11 6"
            markerWidth="10"
            markerHeight="10"
            refX="1.3"
            refY="1"
          >
            <path d="M0,0 V2 L1,1 Z" fill="#009BFF" stroke="#009BFF" />
          </marker>
        </defs>
        <text
          className={classes.text}
          x={coords?.text?.x}
          y={coords?.text?.y + 10} // align to bottom
          style={{ display: currSelect.id === id && fIStatus ? 'none' : '' }}
        >
          {text ? text : ''}
        </text>
        {item.active && item.id === id ? (
          <line
            className={
              type === ASSOCIATION.SIMPLE
                ? classes.associationSelected
                : classes.associationNavSelected
            }
            x1={coords?.x1}
            y1={coords?.y1}
            x2={coords?.x2}
            y2={coords?.y2}
          />
        ) : null}
        <line
          className={
            type === ASSOCIATION.SIMPLE
              ? classes.association
              : classes.associationNav
          }
          x1={coords?.x1}
          y1={coords?.y1}
          x2={coords?.x2}
          y2={coords?.y2}
        />
      </g>
    );
  }
);

Association.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  coords: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  note: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
Association.defaultProps = {
  id: 0,
  type: 'ASSOCIATION.SIMPLE',
  coords: { x1: 0, y1: 0, x2: 0, y2: 0, text: { x: 0, y: 0 } },
  connections: [],
  note: 'Association note',
  text: 'connect to',
};
Association.displayName = 'Association';

export default Association;
