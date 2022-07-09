import React, { createRef, useRef, useState } from 'react';
import { default as PropTypes } from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Divider,
  Tooltip,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { unselectItem, setNoteTbInactive, resetUi, setMenuInactive } from '@services/ui/actions';

import { useNavbar, useSubheader, useUser } from '@providers';
import { ColorLensOutlined } from '@material-ui/icons';

const NavContent = () => {
  const listRef = useRef([]);
  const [lastTabIndex, setLastTabIndex] = useState(-1);
  const [active, setActive] = useState(-1);

  const { isAuthenticated, logout } = useUser();
  const { tabIndex } = useSubheader();
  const { isDoubleSelected, setIsDoubleSelected, isOneSelected,
    setIsOneSelected, navItems, navItemIndex, handleChangeNavItem } = useNavbar();
  const dispatch = useDispatch();

  if (tabIndex !== lastTabIndex) {
    listRef.current = Array(navItems[tabIndex]?.length)
      .fill()
      .map((_, i) => listRef?.current[i] || createRef());
    setLastTabIndex(tabIndex);
    setActive(-1);
  }


  let isAtFileTab = true;

  function getColor() {
    if (isDoubleSelected) {
      return 'green';
    } else if (isOneSelected) {
      return 'blue';
    } else {
      return '';
    }
  }
  if (tabIndex == 1) {
    isAtFileTab = false;
  }


  return (
    <List>
      {navItems[tabIndex]?.map(
        ({ id, primaryText, icon, isSvg, hasOptions }, i) => (
          <ListItem
            key={id}
            ref={listRef?.current[i]}
            style={{ background: active == i && !isAtFileTab && (isOneSelected || isDoubleSelected) ? getColor() : '', borderWidth: 3 }}

            button
            onClick={(e) => {

              if (isDoubleSelected&&i==active) {
                setIsDoubleSelected(false);
                setActive(-1);
                dispatch(unselectItem());
                
              }else if(isOneSelected && i == active) {
                setIsDoubleSelected(false);
                setActive(-1);
                dispatch(unselectItem());

              } else {
                if (!isAtFileTab) {
                  setActive(i);
                  setIsOneSelected(true);
                  setIsDoubleSelected(false);
                } else {
                  setActive(-1);
                }

                handleChangeNavItem({
                  index: i,
                  id,
                  hasOptions,
                  anchorEl: listRef?.current[i]?.current,

                });
              }
            }
            }

            onDoubleClick={(e) => {

              if (!isAtFileTab) {
                setActive(i);
                setIsDoubleSelected(true);
                setIsOneSelected(false);
              } else {
                setActive(-1);
              }

              handleChangeNavItem({
                index: i,
                id,
                hasOptions,
                anchorEl: listRef?.current[i]?.current,

              });
            }
            }
          >
            <ListItemIcon>
              <Tooltip title={primaryText} placement="right">
                {isSvg ? (
                  <img
                    alt={primaryText}
                    draggable={false}
                    style={{ maxWidth: 24, maxHeight: 24 }}
                    src={icon}
                  />
                ) : (
                  <Icon>{icon}</Icon>
                )}
              </Tooltip>
            </ListItemIcon>
            <ListItemText
              primary={primaryText}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        )
      )}
      <Divider style={{ margin: '12px 0' }} />
      {isAuthenticated &&
        navItems?.extra.map(({ id, primaryText, icon }) => (
          <ListItem key={id} button onClick={logout}>
            <ListItemIcon>
              <Tooltip title={primaryText} placement="right">
                <Icon>{icon}</Icon>
              </Tooltip>
            </ListItemIcon>
            <ListItemText
              primary={primaryText}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        ))}
    </List>
  );
};

NavContent.propTypes = {};
NavContent.defaultProps = {};

export default NavContent;
