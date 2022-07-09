import React from 'react';
import { default as PropTypes } from 'prop-types';
import { Paper, Tab, Tabs } from '@material-ui/core';

import { useSubheader } from '@providers';
import {
  usePaperStyles,
  useTabsStyles,
  useTabItemStyles,
} from '@layout/subheader/styles/containedTabs.styles';

const ContainedTabs = ({
  appConfig: {
    subheader: { tabsData },
  },
}) => {
  const paperStyles = usePaperStyles();
  const tabsStyles = useTabsStyles();
  const tabItemStyles = useTabItemStyles();
  const { tabIndex, onChangeTab } = useSubheader();

  return (
    <Paper classes={paperStyles} square={true} variant="outlined">
      <Tabs
        classes={tabsStyles}
        value={tabIndex}
        onChange={(e, index) => onChangeTab(index)}
      >
        {tabsData.map((tab) => (
          <Tab key={tab.id} classes={tabItemStyles} label={tab.label} />
        ))}
      </Tabs>
    </Paper>
  );
};

ContainedTabs.propTypes = {
  appConfig: PropTypes.object,
};
ContainedTabs.defaultProps = {
  appConfig: {},
};

export default ContainedTabs;
