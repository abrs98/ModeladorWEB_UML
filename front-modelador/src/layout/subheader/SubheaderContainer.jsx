import React from 'react';
import { default as PropTypes } from 'prop-types';

import { withConfig } from '@providers/config';
import { Subheader } from '@layout/layouts';
import { ErrorBoundary } from '@layout/common/components';
import { ContainedTabs } from '@layout/subheader/components';

const SubeaderContainer = ({ appConfig }) => {
  return (
    <ErrorBoundary>
      <Subheader subheaderId="subheader">
        <ContainedTabs appConfig={appConfig} />
      </Subheader>
    </ErrorBoundary>
  );
};

SubeaderContainer.propTypes = {
  appConfig: PropTypes.object,
};
SubeaderContainer.defaultProps = {
  appConfig: {},
};

export default withConfig(SubeaderContainer);
