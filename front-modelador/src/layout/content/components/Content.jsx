import React from 'react';
import { Paper } from '@material-ui/core';

import { CanvasContainer } from '@layout/canvas';

import { useContentStyles, usePaperStyles } from '../styles/content.style';

const Content = () => {
  const contentStyles = useContentStyles();
  const paperStyles = usePaperStyles();

  return (
    <div classes={contentStyles}>
      <Paper classes={paperStyles} variant="outlined" square>
        <CanvasContainer />
      </Paper>
    </div>
  );
};

Content.propTypes = {};
Content.defaultProps = {};

export default Content;
