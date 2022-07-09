import React from 'react';
import { Menu, MenuItem, Typography } from '@material-ui/core';

import { useNavbar, useSubheader } from '@providers';
import { useMenuOptionsStyles } from '@layout/navbar/styles';

const MenuOptions = () => {
  const classes = useMenuOptionsStyles();
  const { tabIndex } = useSubheader();
  const {
    navItems,
    navItemIndex,
    navMenuActive,
    navMenuAnchorEl,
    handleChangeMenuItemId,
    handleCloseMenu,
  } = useNavbar();

  return (
    <>
      {navMenuActive && navMenuAnchorEl ? (
        <Menu
          getContentAnchorEl={null}
          anchorEl={navMenuAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.menu,
          }}
          elevation={0}
          onClose={handleCloseMenu}
          open={navMenuActive}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {navItems[tabIndex][navItemIndex]?.options?.map(({ id, name }) => (
            <MenuItem key={id} onClick={() => handleChangeMenuItemId(id)}>
              <Typography noWrap>{name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </>
  );
};

MenuOptions.propTypes = {};
MenuOptions.defaultProps = {};

export default MenuOptions;
