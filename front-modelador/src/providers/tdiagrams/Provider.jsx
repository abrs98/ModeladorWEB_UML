import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/tdiagrams/Context';
import {
  setTDiagrams,
  updateTDiagramName,
  removeTDiagram,
} from '@services/template/actions';

const Provider = ({ children }) => {
  const { tdiagrams } = useSelector((store) => store?.template);
  const dispatch = useDispatch();

  const __localUpdate = ({ id, name }) => {
    const tempTDiagrams = [...tdiagrams];
    const index = tempTDiagrams?.findIndex((item) => item?.id === id);
    tempTDiagrams[index].name = name;
    dispatch(setTDiagrams({ tdiagrams: tempTDiagrams }));
  };

  const __localRemove = ({ id }) => {
    const tempTDiagrams = [...tdiagrams];
    const index = tempTDiagrams?.findIndex((item) => item?.id === id);
    tempTDiagrams?.splice(index, 1);
    dispatch(setTDiagrams({ tdiagrams: tempTDiagrams }));
  };

  const update = ({ id, name }) => {
    dispatch(updateTDiagramName({ id, name }));
    __localUpdate({ id, name });
  };

  const remove = ({ id }) => {
    dispatch(removeTDiagram({ id }));
    __localRemove({ id });
  };

  return (
    <Context.Provider
      value={{
        tdiagrams,
        update,
        remove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.any,
};
Provider.defaultProps = {};

export default Provider;
