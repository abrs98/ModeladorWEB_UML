/* eslint-disable indent */
import React from 'react';

import { useModal } from '@providers';
import { ErrorBoundary } from '@layout/common/components';
import { ModalSimple, ModalInput } from '@layout/modal/components';
import * as C from '@constants/modal';

const ModalContainer = () => {
  const {
    open,
    type,
    data,
    inputValue,
    approve,
    dispose,
    setInputValue,
  } = useModal();

  const currentModal = () => {
    switch (type) {
      case C.MODAL_SIMPLE:
        return (
          <ModalSimple
            open={open}
            title={data?.title}
            contentText={data?.content}
            approve={approve}
            dispose={dispose}
          />
        );
      case C.MODAL_INPUT:
        return (
          <ModalInput
            open={open}
            title={data?.title}
            contentText={data?.content}
            label={data?.label}
            approve={approve}
            dispose={dispose}
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
          />
        );
      default:
        return null;
    }
  };

  return <ErrorBoundary>{currentModal()}</ErrorBoundary>;
};

ModalContainer.propTypes = {};
ModalContainer.defaultProps = {};

export default ModalContainer;
