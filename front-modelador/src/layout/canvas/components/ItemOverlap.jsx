import React from 'react';
import { useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { useMousePosition } from '@hooks';
import { useNavbar, useSubheader } from '@providers';
import { ELEMENT } from '@layout/canvas/lib';
import { useItemOverlapStyles } from '@layout/canvas/styles';

const ItemOverlap = ({ offset }) => {
  const classes = useItemOverlapStyles();
  const {
    mouseGlobal: { x, y },
  } = useMousePosition();
  const { itemType } = useSelector((store) => store.ui);
  const { navItems, navItemIndex } = useNavbar();
  const { tabIndex } = useSubheader();

  return (
    <>
      {itemType?.includes(ELEMENT.KEY) && (
        <div
          className={classes.overlayItem}
          style={{ left: x + offset, top: y + offset }}
        >
          <img
            alt={itemType}
            draggable={false}
            style={{ height: '100%', width: '100%' }}
            src={navItems[tabIndex][navItemIndex]?.icon}
          />
        </div>
      )}
    </>
  );
};

ItemOverlap.propTypes = {
  offset: PropTypes.number,
};
ItemOverlap.defaultProps = {
  offset: 5,
};

export default ItemOverlap;
