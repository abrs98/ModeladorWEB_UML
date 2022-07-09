import React from 'react';
import { Toolbar } from '@material-ui/core';

import { Header, SidebarTrigger } from '@layout/layouts';
import { ErrorBoundary } from '@layout/common/components';
import { AppBar } from '@layout/header/components';

const HeaderContainer = () => {
  return (
    <ErrorBoundary>
      <Header>
        <Toolbar style={{ backgroundColor: '#fff' }}>
          <SidebarTrigger sidebarId="sidebarActions" />
          <AppBar />
        </Toolbar>
      </Header>
    </ErrorBoundary>
  );
};

HeaderContainer.propTypes = {};
HeaderContainer.defaultProps = {};

export default HeaderContainer;
