import React, { useRef, useState } from 'react';
import { Input } from '@material-ui/core';

import { useItem } from '@providers';
import { useFloatingInputStyles } from '@layout/canvas/styles';

const MODULE_NAME = 'FloatingInput';
const FloatingInput = () => {
  const classes = useFloatingInputStyles();
  const inputRef = useRef(null);
  const {
    item,
    fIStatus,
    setItemText,
    isValidText,
    getTextWidth,
    getInputLeftPos,
    getInputTopPos,
  } = useItem();
  const [autofocus, setAutofocus] = useState(true);

  const handleBlur = (e) => {
    e.preventDefault();
    try {
      if (inputRef) {
        setAutofocus(false);
        inputRef?.current?.blur();
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  const handleEditText = (e) => {
    e.preventDefault();
    try {
      const text = e?.target?.value;
      if (isValidText(text)) {
        setItemText({ text });
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  const handleFocus = (e) => {
    e.preventDefault();
    try {
      if (inputRef?.current) {
        inputRef?.current?.focus();
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  return (
    <>
      {fIStatus ? (
        <Input
          autoFocus={autofocus}
          className={classes.input}
          value={item.text || ''}
          color="secondary"
          inputProps={{
            style: { textAlign: 'center' },
            'aria-label': 'description',
          }}
          inputRef={inputRef}
          style={{
            display: fIStatus ? '' : 'none',
            left: getInputLeftPos(),
            top: getInputTopPos(),
            width: getTextWidth(),
            zIndex: 40,
          }}
          onChange={handleEditText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerMove={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          type="text"
          size="small"
        />
      ) : null}
    </>
  );
};

FloatingInput.propTypes = {};
FloatingInput.defaultProps = {};

export default FloatingInput;
