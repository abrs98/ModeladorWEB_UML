import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/modal/Context';
import { approveModal, disposeModal } from '@services/ui/actions';
import * as C from '@constants';

const Provider = ({ children }) => {
  const [inputValue, setInputValue] = useState('');
  const { modalOpen, modalType, modalData } = useSelector((store) => store?.ui);
  const dispatch = useDispatch();

  const approve = () => {
    let data = { ...modalData };
    if (modalType === C.MODAL_INPUT) {
      data = { ...data, inputValue };
      setInputValue('');
    }
    dispatch(approveModal({ data: data }));
  };

  const dispose = () => {
    dispatch(disposeModal());
  };

  return (
    <Context.Provider
      value={{
        open: modalOpen,
        type: modalType,
        data: modalData,
        inputValue,
        approve,
        dispose,
        setInputValue,
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
