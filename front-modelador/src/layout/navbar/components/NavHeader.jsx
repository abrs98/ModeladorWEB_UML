import React from 'react';
import { default as PropTypes } from 'prop-types';
import {
  Avatar,
  Typography,
  Divider,
  Container,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useNavHeaderStyles } from '@layout/navbar/styles';

const NavHeader = ({ user, isLoading, collapsed }) => {
  const classes = useNavHeaderStyles();

  return (
    <>
      <div style={{ padding: collapsed ? 8 : 16, transition: '0.3s' }}>
        <Container className={classes.center}>
          {isLoading ? (
            <Skeleton
              variant="circle"
              width={collapsed ? 48 : 60}
              height={collapsed ? 48 : 60}
            />
          ) : (
            <Avatar
              alt={user?.name}
              src={user?.picture}
              style={{
                width: collapsed ? 48 : 60,
                height: collapsed ? 48 : 60,
                transition: '0.3s',
              }}
            />
          )}
          <div style={{ paddingBottom: collapsed ? 8 : 16 }} />
          {collapsed ? null : (
            <>
              {isLoading ? (
                <>
                  <Skeleton variant="text" width={80} />
                  <Skeleton variant="text" width={140} />
                </>
              ) : (
                <>
                  <Typography variant={'h6'} noWrap>
                    {user?.name}
                  </Typography>
                  <Typography color={'textSecondary'} noWrap gutterBottom>
                    {user?.email}
                  </Typography>
                </>
              )}
            </>
          )}
        </Container>
      </div>
      <Divider />
    </>
  );
};

NavHeader.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  collapsed: PropTypes.bool,
};

NavHeader.defaultProps = {
  user: {
    name: 'Default',
    email: 'default@gmail.com',
    picture: '',
  },
  isLoading: false,
  collapsed: false,
};

export default NavHeader;
