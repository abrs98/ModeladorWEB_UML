import React from 'react';
import {
  Box,
  Fab,
  TextareaAutosize,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  CloseSharp as CloseSharpIcon,
  Notes as NotesIcon,
} from '@material-ui/icons';

import { useCurrentWork, useItem } from '@providers';

const MODULE_NAME = 'FabItem';
const FabItem = () => {
  const { currSelect, resetSelections } = useCurrentWork();
  const {
    item,
    note,
    setItemNote,
    toggleItemNoteActive,
    removeCurrentItem,
    isValidNote,
    getFabLeftPos,
    getFabTopPos,
    setFIStatus,
  } = useItem();

  const handleEditNote = (e) => {
    try {
      const note = e?.target?.value;
      if (isValidNote(note)) {
        setItemNote({ note });
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  const handleDeleteItem = (e) => {
    try {
      removeCurrentItem();
      resetSelections();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    try {
      setFIStatus(false);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
    }
  };

  return (
    <Box
      display={item.id ? '' : 'none'}
      position={'absolute'}
      left={getFabLeftPos()}
      top={getFabTopPos()}
      zIndex={50}
      onPointerDown={(e) => handlePointerDown(e)}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <Fab
        color="secondary"
        aria-label="note"
        style={{
          height: 20,
          minHeight: 20,
          width: 20,
          margin: 3,
        }}
        onPointerDown={(e) => toggleItemNoteActive()}
      >
        <NotesIcon style={{ fontSize: 14 }} />
      </Fab>
      <Fab
        color="secondary"
        aria-label="delete"
        style={{
          height: 20,
          minHeight: 20,
          width: 20,
          marginRight: 3,
        }}
        onPointerDown={(e) => handleDeleteItem(e)}
      >
        <CloseSharpIcon style={{ fontSize: 13 }} />
      </Fab>
      <Box display={note.active ? '' : 'none'}>
        <Paper variant="outlined" square>
          <Box marginLeft={1} marginRight={1}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                KhtmlUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
              }}
            >
              Note:
            </Typography>
            <TextareaAutosize
              aria-label="note"
              rowsMin={3}
              rowsMax={5}
              value={note.value}
              placeholder="Describe the behavior..."
              onChange={(e) => handleEditNote(e)}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

FabItem.propTypes = {};
FabItem.defaultProps = {};

export default FabItem;
