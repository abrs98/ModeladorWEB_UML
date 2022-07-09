import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as PropTypes } from 'prop-types';

import { default as Context } from '@providers/item/Context';
import { updateItem, removeItem } from '@services/currentWork/actions';
import { setCurrentItem, toggleNoteTbStatus, setNoteTbActive, setNoteTbInactive } from '@services/ui/actions';
import * as A from '@services/itemProperties/actions';
import { RobustnessItemMapper, ASSOCIATION, ELEMENT } from '@layout/canvas/lib';
import { measureWidth } from '@libs';
import { FINPUT_MIN_WIDTH, FAB_NOTE_MAX_LEN } from '@constants/ui';

const Provider = ({ children }) => {
  const itemProperties = useSelector((store) => store.itemProperties);
  const { currentItem, noteTbStatus } = useSelector((store) => store.ui);
  const { currSelect, findItemById } = useSelector((store) => store.currentWork);
  const [position, setPosition] = useState({}); // @fix
  const [note, setNote] = useState({
    text: '',
  });
  const [fIStatus, setFIStatus] = useState(false);
  const dispatch = useDispatch();

  const setItemDto = (rawItem) => {
    setNote({ text: rawItem.note });
    dispatch(A.setItemDto(rawItem));
  };

  const setItemNote = ({ note }) => {
    setNote({ text: note });
    dispatch(A.setItemNote(note));
    const item = RobustnessItemMapper.toDTO(itemProperties);
    __update({ ...item, note });
  };

  const setItemText = ({ text }) => {
    dispatch(A.setItemText(text));
    const item = RobustnessItemMapper.toDTO(itemProperties);
    __update({ ...item, text });
  };

  const setItemActive = () => {
    dispatch(A.setItemActive());
  };

  const setItemInactive = () => {
    dispatch(A.setItemInactive());
  };

  const setItemNoteActive = () => {
    dispatch(A.setItemNoteActive());
  };

  const setItemNoteInactive = () => {
    dispatch(A.setItemNoteInactive());
  };

  const setItemTextActive = () => {
    dispatch(A.setItemTextActive());
  };

  const setItemTextInactive = () => {
    dispatch(A.setItemTextInactive());
  };

  const setItemPositionEl = (positionEl) => {
    dispatch(A.setItemPositionEl(positionEl));
  };

  const removeCurrentItem = () => {
    const item = itemProperties;
    dispatch(removeItem(item));
    resetItemState();
  };

  const resetItemState = () => {
    setPosition({});
    setNote({ text: '' });
    setFIStatus(false);
    dispatch(A.setDefaultItemState());
  };

  // Customs
  const setItemSelected = (rawItem) => {
    setItemDto(rawItem);
    setItemActive();
  };
  // end customs

  // togglers
  const toggleItemNoteActive = () => {
    dispatch(toggleNoteTbStatus());
  };
  // end togglers

  // Validations
  const isValidText = (text) => {
    if (text?.length < 0) return;
    const item = itemProperties;
    return item.text !== text && text.length <= 20;
  };

  const isValidNote = (note) => {
    if (note?.length < 0) return;
    const item = itemProperties;
    return item.note !== note && note.length <= FAB_NOTE_MAX_LEN;
  };

  const isDifferentPosition = ({ positionEl }) => {
    return JSON.stringify(position) !== JSON.stringify(positionEl);
  };
  // end validations

  const getTextWidth = () => {
    const item = itemProperties;
    const width = measureWidth(item?.text) + item?.text?.length;
    const lastCharWidth = measureWidth(item?.text.substr(-1));
    const result = width + lastCharWidth < 50 ? 50 : width + lastCharWidth;
    return width <= 30 ? FINPUT_MIN_WIDTH : result;
  };

  const getInputLeftPos = () => {
    const { x, width } = position;
    const textWidth = getTextWidth();
    return x + width / 2 - textWidth / 2;
  };

  const getInputTopPos = () => {
    const { type } = itemProperties;
    const { top } = position;
    if (type.includes(ASSOCIATION.KEY)) {
      return top;
    } else if (type?.includes(ELEMENT.KEY)) {
      return top + 51;
    } else {
      return top;
    }
  };

  const getFabLeftPos = () => {
    const { right } = position;
    const { type } = itemProperties;
    if (type?.includes(ASSOCIATION.KEY)) {
      return right - 30;
    } else if (type?.includes(ELEMENT.KEY)) {
      return right + 30;
    } else {
      return right;
    }
  };

  const getFabTopPos = () => {
    const { top } = position;
    const { type } = itemProperties;
    if (type?.includes(ASSOCIATION.KEY)) {
      return top;
    } else if (type?.includes(ELEMENT.KEY)) {
      return top - 15;
    } else {
      return top;
    }
  };

  // Current work
  const __update = (item) => {
    dispatch(updateItem(RobustnessItemMapper.toDTO(item)));
  };

  return (
    <Context.Provider
      value={{
        currentItem,
        item: itemProperties,
        position,
        note: { value: itemProperties.note, active: noteTbStatus },
        fIStatus,
        setPosition,
        setItemDto,
        setItemNote,
        setItemText,
        setItemActive,
        setItemInactive,
        setItemNoteActive,
        setItemNoteInactive,
        setItemTextActive,
        setItemTextInactive,
        setItemPositionEl,
        setFIStatus,
        resetItemState,
        removeCurrentItem,
        setItemSelected,
        toggleItemNoteActive,
        isValidText,
        isValidNote,
        getTextWidth,
        getInputLeftPos,
        getInputTopPos,
        getFabLeftPos,
        getFabTopPos,
        isDifferentPosition,
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
