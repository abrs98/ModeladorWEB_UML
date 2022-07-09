import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/navbar/Context';
import {
  changeActiveNavItem,
  changeMenuItemId,
  setMenuInactive,
  unselectItem,
} from '@services/ui/actions';

//__TEMP
import config from '@config';

const Provider = ({ children }) => {
  const {
    navItemIndex,
    navItemId,
    navMenuItemId,
    navMenuActive,
    /*navMenuAnchorEl,*/
  } = useSelector((store) => store?.ui);
  const navItems = config?.nav;
  const [navMenuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isDoubleSelected, setIsDoubleSelected] = useState(false);
  const [isOneSelected, setIsOneSelected] = useState(false);
  const dispatch = useDispatch();

  const handleChangeNavItem = (navItem) => {
    dispatch(changeActiveNavItem({ ...navItem, anchorEl: null }));
    setMenuAnchorEl(navItem.anchorEl);
    
  };

  const handleChangeMenuItemId = (id) => {
    dispatch(changeMenuItemId(id));
    dispatch(setMenuInactive());
  };

  const handleCloseMenu = () => {
    dispatch(setMenuInactive());
    
  };

  return (
    <Context.Provider
      value={{
        navItems,
        navItemIndex,
        navItemId,
        navMenuItemId,
        navMenuActive,
        isDoubleSelected,
        setIsDoubleSelected,
        isOneSelected, 
        setIsOneSelected,
        navMenuAnchorEl,
        handleChangeNavItem,
        handleChangeMenuItemId,
        handleCloseMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {};

export default Provider;
