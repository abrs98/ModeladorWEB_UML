import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { Box, Button, Paper } from '@material-ui/core';

import { useCurrentWork, useTDiagrams, useItem, useSnackbar, usePanel } from '@providers';

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

const MODULE_NAME = 'TDiagrams';
const TDiagrams = (title = 'Templates') => {
  const { replaceCurrentWorkByTemplate } = useCurrentWork();
  const { tdiagrams, update, remove } = useTDiagrams();
  const { resetItemState } = useItem();
  const { snackbar } = useSnackbar();
  const { goToMainPanel } = usePanel();
  const [currList, setCurrList] = useState(tdiagrams);

  if (currList != tdiagrams) {
    setCurrList(tdiagrams);
  }

  const handleClick = (e, item) => {
    try {
      resetItemState();
      replaceCurrentWorkByTemplate(item);
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
        title={'Templates'}
        columns={columns}
        data={currList}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const { id, name, items } = newData;
                update({ id, name, items });
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
                remove({ id: oldData?.id });
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

TDiagrams.propTypes = {};
TDiagrams.defaultProps = {};

export default TDiagrams;
