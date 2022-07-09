import React from 'react';
import { default as PropTypes } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const MODULE_NAME = 'Modal';
const ModalSimple = ({ open, title, contentText, approve, dispose, children }) => {
  const handleOk = () => {
    try {
      approve();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  const handleClose = () => {
    try {
      dispose();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onPointerDown={handleClose} color="primary">
          Cancel
        </Button>
        <Button onPointerDown={handleOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalSimple.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  approve: PropTypes.func,
  dispose: PropTypes.func,
  children: PropTypes.object,
};

export default ModalSimple;
