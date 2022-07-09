import React from 'react';
import { default as PropTypes } from 'prop-types';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@material-ui/core';
import { Share as ShareIcon, Close as CloseIcon } from '@material-ui/icons';
import { useSidebarTrigger } from '@mui-treasury/layout';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

import { useProjects, useSidebar, useSnackbar } from '@providers';
import { useInviteCollabStyles } from '@layout/sidebar/styles';

const MODULE_NAME = 'InviteCollab';
const InviteCollab = () => {
  const styles = useInviteCollabStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const {
    id: sidebarId,
    setOpen,
    state
  } = useSidebarTrigger('secondarySidebar', 'CustomSidebarTrigger');
  const { addColab } = useProjects();
  const { project, inputVal, removeProject, setInputVal } = useSidebar();
  const { snackbar } = useSnackbar();

  const handleClose = () => {
    try {
      setOpen(sidebarId, !state.open);
      removeProject();
      setInputVal('');
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  const handleAddColab = ({ id, email }) => {
    try {
      addColab({ id, email });
      handleClose();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  return (
    <>
      <Column p={1.5} gap={1}>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
        >
          <IconButton
            className={styles.closeAction}
            classes={iconBtnStyles}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Row>
          <Item>
            <ShareIcon />
          </Item>
          <Item grow minWidth={0}>
            <Typography variant={'h6'}>Invite collaborators</Typography>
          </Item>
        </Row>
        <Item>
          <TextField
            autoFocus
            margin={'dense'}
            label={'Add people by email address'}
            type={'text'}
            fullWidth
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </Item>
        <Item>
          <Button
            onClick={(e) => handleAddColab({ id: project.id, email: inputVal })}
          >Share</Button>
        </Item>
      </Column>
      <Divider light />
    </>
  );
};

InviteCollab.propTypes = {};
InviteCollab.defaultProps = {};

export default InviteCollab;
