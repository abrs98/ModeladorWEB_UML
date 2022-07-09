import React from 'react';
import { default as PropTypes } from 'prop-types';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { Share as ShareIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { useSidebarTrigger } from '@mui-treasury/layout';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

import { useProjects, useSidebar, useSnackbar } from '@providers';
import { useManageCollabsStyles } from '@layout/sidebar/styles';

const MODULE_NAME = 'ManageCollabs';
const ManageCollabs = () => {
  const styles = useManageCollabsStyles();
  const avatarStyles = useDynamicAvatarStyles({ size: 48 });
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const {
    id: sidebarId,
    setOpen,
    state
  } = useSidebarTrigger('secondarySidebar', 'CustomSidebarTrigger');
  const { removeColab } = useProjects();
  const { project, removeProject, setInputVal } = useSidebar();
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

  const handleRemoveMember = ({ id, email }) => {
    try {
      removeColab({ id, email })
      handleClose();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  return (
    <Column p={1.5} gap={1}>
      <Row>
        <Item>
          <ShareIcon />
        </Item>
        <Item>
          <Typography variant={'h6'}>Collaborators</Typography>
        </Item>
      </Row>
      <>
        {project?.team?.map(({ id, name, email, avatar }) => (
          <Row key={id} p={1.5} gap={1}>
            <Item>
              <Avatar
                classes={avatarStyles}
                src={avatar}
              />
            </Item>
            <Row wrap grow gap={0.5} minWidth={0}>
              <Item grow minWidth={0}>
                <Info position={'middle'} useStyles={useNewsInfoStyles}>
                  <InfoTitle>{name}</InfoTitle>
                  <InfoSubtitle>{email}</InfoSubtitle>
                </Info>
              </Item>
              <Item position={'middle'}>
                <IconButton
                  className={styles.action}
                  classes={iconBtnStyles}
                  onClick={(e) => handleRemoveMember({ id: project.id, email })}
                >
                  <DeleteIcon />
                </IconButton>
              </Item>
            </Row>
          </Row>
        ))}
      </>
    </Column>
  );
};

ManageCollabs.propTypes = {};
ManageCollabs.defaultProps = {};

export default ManageCollabs;
