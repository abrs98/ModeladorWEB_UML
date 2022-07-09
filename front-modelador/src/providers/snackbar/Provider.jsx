import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';
// import { Typography } from '@material-ui/core';

import { default as Context } from '@providers/snackbar/Context';
import { enqueueSnackbar } from '@services/notification/actions';

const Provider = ({ children }) => {
  const dispatch = useDispatch();

  const snackbar = ({ module, msj, variant, ...other }) => {
    dispatch(
      enqueueSnackbar({
        /*message: (
          <Typography
            style={{
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              KhtmlUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
            }}
          >
            {msj}
          </Typography>
        ),*/
        message: msj,
        options: {
          key: new Date().getTime() + Math.random(),
          variant,
        },
      })
    );
  };

  return <Context.Provider value={{ snackbar }}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {};

export default Provider;
