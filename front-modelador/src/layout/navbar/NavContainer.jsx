import React from 'react';
import { default as PropTypes } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { useSidebar } from '@mui-treasury/layout/hooks';

import { useUser } from '@providers';
import { DrawerSidebar, SidebarContent, CollapseBtn } from '@layout/layouts';
import { ErrorBoundary } from '@layout/common/components';
import { MenuOptions, NavContent, NavHeader } from '@layout/navbar/components';

const NavContainer = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const {
    state: { open, collapsed },
  } = useSidebar('sidebarActions');

  return (
    <ErrorBoundary>
      <DrawerSidebar sidebarId="sidebarActions">
        <SidebarContent>
          {isAuthenticated && (
            <NavHeader
              user={user}
              isLoading={isLoading}
              collapsed={collapsed}
              onLogout={logout}
            />
          )}
          <NavContent />
          <MenuOptions/>
        </SidebarContent>
        {/*<CollapseBtn />*/}
      </DrawerSidebar>
    </ErrorBoundary>
  );
};

NavContainer.propTypes = {};
NavContainer.defaultProps = {};

export default NavContainer;
