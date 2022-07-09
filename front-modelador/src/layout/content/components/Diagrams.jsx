import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { Box, Button, Paper } from '@material-ui/core';

import { useCurrentWork, useDiagrams, useItem, useSnackbar, usePanel } from '@providers';

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
    readonly: true,
    editComponent: (props) => props?.value,
  },
];

const options = {
  actionsColumnIndex: -1,
  paging: false,
  search: false,
};

const MODULE_NAME = 'Diagrams';
const Diagrams = (title = 'Diagrams') => {
  const { workId, replaceCurrentWork, setCurrentWorkName, cleanCurrentWork } = useCurrentWork();
  const { diagrams, update, remove } = useDiagrams();
  const { resetItemState } = useItem();
  const { snackbar } = useSnackbar();
  const { goToMainPanel } = usePanel();
  const [currList, setCurrList] = useState(diagrams);

  if (currList != diagrams) {
    setCurrList(diagrams);
  }

  const handleClick = (e, item) => {
    try {
      resetItemState();
      replaceCurrentWork(item);
      goToMainPanel();
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
        title={'Diagrams'}
        columns={columns}
        data={currList}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const { id, name, items } = newData;
                if (id === workId) setCurrentWorkName({ name });
                update({ id, name, items });
                resolve();
              }, 100);
            }).catch((err) => {
              const msj = 'Error in ' + MODULE_NAME;
              if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
              snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
            }),
          onRowDelete: ({ id }) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (id === workId) cleanCurrentWork();
                remove({ id });
                resolve();
              }, 100);
            }).catch((err) => {
              const msj = 'Error in ' + MODULE_NAME;
              if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
              snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
            }),
        }}
        onRowClick={handleClick}
        options={options}
      />
    </Paper>
  );
};

Diagrams.propTypes = {};
Diagrams.defaultProps = {};

export default Diagrams;
