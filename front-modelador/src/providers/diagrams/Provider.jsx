import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/diagrams/Context';
import {
  setDiagrams,
  updateDiagram,
  deleteDiagram,
} from '@services/diagram/actions';

const Provider = ({ children }) => {
  const { diagrams } = useSelector((store) => store?.diagram);
  const dispatch = useDispatch();

  const __localUpdate = ({ id, name }) => {
    const tempDiagrams = [...diagrams];
    const index = tempDiagrams?.findIndex((item) => item?.id === id);
    tempDiagrams[index].name = name;
    dispatch(setDiagrams({ diagrams: tempDiagrams }));
  };

  const __localRemove = ({ id }) => {
    const tempDiagrams = [...diagrams];
    const index = tempDiagrams?.findIndex((item) => item?.id === id);
    tempDiagrams?.splice(index, 1);
    dispatch(setDiagrams({ diagrams: tempDiagrams }));
  };

  const update = ({ id, name, items }) => {
    dispatch(updateDiagram({ id, name, items }));
    __localUpdate({ id, name });
  };

  const remove = ({ id }) => {
    dispatch(deleteDiagram({ id }));
    __localRemove({ id });
  };

  return (
    <Context.Provider
      value={{
        diagrams,
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
