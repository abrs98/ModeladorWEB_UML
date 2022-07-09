import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useSidebarTrigger } from '@mui-treasury/layout';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Description as DescriptionIcon,
} from '@material-ui/icons';

import { useCurrentWork, useProjects, useItem, useSnackbar, usePanel } from '@providers';

const columns = [
  { title: 'ID', field: 'id', hidden: true, filtering: false },
  {
    title: 'Name',
    field: 'name',
    validate: ({ name }) => name !== '' && name?.length <= 45,
  },
  {
    title: 'Updated at',
    field: 'updatedAt',
    editable: 'never',
  },
];

const options = {
  actionsColumnIndex: -1,
  paging: false,
  search: false,
};

const MODULE_NAME = 'Projects';
const Projects = () => {
  const { id: sidebarId, setOpen, state } = useSidebarTrigger('secondarySidebar', 'CustomSidebarTrigger');
  const { workProjectId, replaceCurrentWorkAsProject, cleanCurrentWork } = useCurrentWork();
  const {
    projects,
    getOneById,
    create,
    update,
    remove,
    saveNewDiagramByProject,
    removeDiagram,
  } = useProjects();
  const { resetItemState } = useItem();
  const { snackbar } = useSnackbar();
  const { goToMainPanel } = usePanel();
  const [currList, setCurrList] = useState(projects);

  if (currList != projects) {
    setCurrList(projects);
  }

  const handleClick = (e, diagram, projectId) => {
    try {
      resetItemState();
      replaceCurrentWorkAsProject({ diagram, projectId });
      goToMainPanel();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  const handleDeleteItem = (e, item, projectId) => {
    try {
      if (workProjectId === projectId) cleanCurrentWork();
      removeDiagram({ id: item.id, projectId });
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  const handleBack = (e) => {
    try {
      goToMainPanel();
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  return (
    <Paper variant="outlined" square>
      <Box p={1}>
        <Button variant="contained" onClick={handleBack}>
          Back to Home
        </Button>
      </Box>
      <MaterialTable
        title={'Projects'}
        columns={columns}
        data={currList}
        detailPanel={(rowData) => {
          return (
            <List component="div">
              {rowData?.diagrams?.map((diagram) => (
                <React.Fragment key={diagram.id}>
                  <ListItem
                    key={diagram.id}
                    button
                    aria-haspopup="true"
                    aria-controls="menu"
                    aria-label={diagram.name}
                    onClick={(e) => handleClick(e, diagram, rowData.id)}
                  >
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={diagram.name} />
                    <ListItemSecondaryAction>
                      <ListItemText primary={diagram.updatedAt} />
                      <IconButton
                        id={diagram.id}
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => handleDeleteItem(e, diagram, rowData.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          );
        }}
        actions={[
          {
            icon: 'people',
            tooltip: 'Manage Collabs',
            onClick: (event, rowData) => {
              const { id } = rowData;
              getOneById({ id });
              setOpen(sidebarId, !state.open);
            },
          },
          {
            icon: 'save',
            tooltip: 'Add Diagram',
            onClick: (event, rowData) => {
              saveNewDiagramByProject({ id: rowData?.id });
            },
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                create(newData);
                resolve();
              }, 100);
            }).catch((err) => {
              const msj = 'Error in ' + MODULE_NAME;
              if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
              snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const { id, name } = newData;
                update({ id: id, name: name });
                resolve();
              }, 100);
            }).catch((err) => {
              const msj = 'Error in ' + MODULE_NAME;
              if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
              snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                remove({ id: oldData.id });
                resolve();
              }, 100);
            }).catch((err) => {
              const msj = 'Error in ' + MODULE_NAME;
              if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
              snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
            }),
        }}
        options={options}
      />
    </Paper>
  );
};

Projects.propTypes = {};
Projects.defaultProps = {};

export default Projects;
