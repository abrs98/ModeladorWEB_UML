import React from 'react';
import { default as PropTypes } from 'prop-types';
import { Box, Icon, IconButton, Typography } from '@material-ui/core';
import { Description as DescriptionIcon } from '@material-ui/icons';

import { useCurrentWork } from '@providers';
import { useHeaderStyles } from '@layout/header/styles';

const Header = ({ title }) => {
  const { titleStyle, iconStyle } = useHeaderStyles();
  const { workName: name, workIsSaved: isSaved } = useCurrentWork();

  return (
    <>
      <Box display='flex' flexGrow={1}>
        <DescriptionIcon className={iconStyle} />
        <Typography className={titleStyle} noWrap>
          {name || title}
          {isSaved ? null : '*'} - Robustness Diagram
        </Typography>
      </Box>
      <div style={{ flexGrow: 1 }} />
      {false && (
        <IconButton>
          <Icon>more_vert</Icon>
        </IconButton>
      )}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};
Header.defaultProps = {
  title: 'Layout v4.0.0 (default)',
};

export default Header;
