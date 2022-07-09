import React from 'react';
import { default as PropTypes } from 'prop-types';
import { TextField } from '@material-ui/core';

import { default as Modal } from '@layout/modal/components/ModalSimple';

const ModalInput = ({
  open,
  title,
  contentText,
  label,
  approve,
  dispose,
  ...other
}) => {
  return (
    <Modal
      open={open}
      title={title}
      contentText={contentText}
      approve={approve}
      dispose={dispose}
    >
      <TextField
        autoFocus
        margin="dense"
        label={label}
        type="text"
        fullWidth
        {...other}
      />
    </Modal>
  );
};

ModalInput.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  approve: PropTypes.func,
  dispose: PropTypes.func,
  children: PropTypes.object,
};

export default ModalInput;
