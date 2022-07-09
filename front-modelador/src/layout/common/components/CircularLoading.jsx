import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const CircularLoading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};

CircularLoading.propTypes = {};
CircularLoading.defaultProps = {};

export default CircularLoading;
