import React from 'react';
import { default as PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';

/**
 * Panel: is a components wrapper, for show or hide components
 */
const Panel = ({ children, value, index, ...other }) => {
  const p = value === 0 ? 0 : 3;

  return (
    <div
      role="panel"
      hidden={value !== index}
      id={`simple-panel-${index}`}
      aria-labelledby={`simple-item-${index}`}
      {...other}
    >
      {value === index && <Box p={p}>{children}</Box>}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
Panel.defaultProps = {};

export default Panel;
