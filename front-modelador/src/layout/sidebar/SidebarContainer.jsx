import React from 'react';
import { default as PropTypes } from 'prop-types';

import { DrawerSidebar, SidebarContent, CollapseBtn } from '@layout/layouts';
import { ErrorBoundary } from '@layout/common/components';
import { InviteCollab, ManageCollabs } from '@layout/sidebar/components';

const SidebarContainer = () => {
  return (
    <ErrorBoundary>
      <DrawerSidebar sidebarId={'secondarySidebar'}>
        <SidebarContent>
          <InviteCollab />
          <ManageCollabs />
        </SidebarContent>
        <CollapseBtn />
      </DrawerSidebar>
    </ErrorBoundary>
  );
};

SidebarContainer.propTypes = {};
SidebarContainer.defaultProps = {};

export default SidebarContainer;
