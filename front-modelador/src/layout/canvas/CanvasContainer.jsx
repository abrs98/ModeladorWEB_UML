import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as GridLines } from 'react-gridlines';
import { Box } from '@material-ui/core';

import { useEventListener, useMousePosition } from '@hooks';
import {
  useCurrentWork,
  useNavbar,
  useItem,
  useGuidelineProps,
  useSnackbar,
} from '@providers';
import { rules as theRules } from '@layout/canvas/lib';
import { ASSOCIATION, ELEMENT } from '@layout/canvas/lib';
import { unselectItem, setNoteTbInactive, resetUi, setMenuInactive } from '@services/ui/actions';
import { Canvas, FabItem, FloatingInput } from '@layout/canvas/components';
import { useCanvasStyles } from '@layout/canvas/styles';

const MODULE_NAME = 'CanvasContainer';
const CanvasContainer = () => {
  const ref = useRef();
  const canvasStyles = useCanvasStyles();
  const [isPointerOnCanvas, setIsPointerOnCanvas] = useState(false);
  const {
    mouseLocal: { x, y },
  } = useMousePosition();
  const {
    currSelect,
    lastSelect,
    addElement,
    addAssociation,
    updateExistingItem,
    setCurrSelect,
    setLastSelect,
    cleanCurrSelect,
    hasCurrSelect,
    findItemById,
  } = useCurrentWork();
  const {
    item,
    fIStatus,
    setItemDto,
    setFIStatus,
    setItemInactive,
  } = useItem();
  const { isDoubleSelected, setIsDoubleSelected, isOneSelected,
    setIsOneSelected, navItems, navItemIndex, handleChangeNavItem } = useNavbar();
  const {
    guideline,
    setGuidelineInactive,
    setDefaultGuidelineState,
  } = useGuidelineProps();
  const { snackbar } = useSnackbar();
  const { itemType, noteTbStatus } = useSelector((store) => store.ui);
  const dispatch = useDispatch();

  const handlePointerDown = () => {
    try {
      // check if a guideline is active for close floating input with item name
      if (!guideline.active && hasCurrSelect()) {
        setFIStatus(false);
        cleanCurrSelect();

      }
      // check if note textbox is extend/active and close it
      if (noteTbStatus) {
        dispatch(setNoteTbInactive());
      }
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  const handlePointerMove = () => {
    try {
      // check if item is on canvas and other params, then update item pos
      if (
        isPointerOnCanvas &&
        item.active &&
        (item.coords?.x !== x || item.coords?.y !== y) &&
        x > 0 &&
        y > 0
      ) {
        updateExistingItem({ id: item.id, coords: { x, y } });
      }
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  const handlePointerUp = (e, debug = false) => {
    try {
      // check if item is active, then change to inactive
      if (item.active) {
        setItemInactive();
        setMenuInactive();
      }

      if (isOneSelected) {

        setIsOneSelected(false);


        // check if an item was selected in navbar
        if (itemType) {
          // check if current item to draw is an assocition, if true
          // check association rules and more
          // if current item is an element, then add new element
          // else something obscure happens.
          if (itemType?.includes(ASSOCIATION.KEY) && guideline.active) {
            const rules = theRules({ from: lastSelect, to: currSelect });
            // check if association rules was valid, if true add new association and
            // reset props, if false reset props and show a warning
            if (rules.isValid) {
              addAssociation({ type: itemType, from: lastSelect, to: currSelect });
              dispatch(unselectItem());
            } else {
              setGuidelineInactive();
              dispatch(unselectItem());
              snackbar({ module: MODULE_NAME, msj: rules.msj, variant: 'warning' });
            }
          } else if (
            itemType?.includes(ELEMENT.KEY) &&
            !guideline.active &&
            x >= 0 &&
            y >= 0
          ) {
            addElement({ type: itemType, coords: { x, y } });
          } else {
            const msj = 'Error on handlePointerUp';
            snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
          }

          // check if a guideline is active for close floating input with item name
          if (!guideline.active) {
            setFIStatus(false);
            dispatch(unselectItem());
          }
          // check if current item to draw is association, if true then reset
          // guideline props
          if (itemType?.includes(ASSOCIATION.KEY) && guideline.active) {
            setDefaultGuidelineState();
          }
        }
      } else if (isDoubleSelected) {
        // check if an item was selected in navbar
        if (itemType) {
          // check if current item to draw is an assocition, if true
          // check association rules and more
          // if current item is an element, then add new element
          // else something obscure happens.
          if (itemType?.includes(ASSOCIATION.KEY) && guideline.active) {
            const rules = theRules({ from: lastSelect, to: currSelect });
            // check if association rules was valid, if true add new association and
            // reset props, if false reset props and show a warning
            if (rules.isValid) {
              addAssociation({ type: itemType, from: lastSelect, to: currSelect });
             
            } else {
              setGuidelineInactive();
              
              snackbar({ module: MODULE_NAME, msj: rules.msj, variant: 'warning' });
            }
          } else if (
            itemType?.includes(ELEMENT.KEY) &&
            !guideline.active &&
            x >= 0 &&
            y >= 0
          ) {
            addElement({ type: itemType, coords: { x, y } });
          } else {
            const msj = 'Error on handlePointerUp';
            snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
          }

          // check if a guideline is active for close floating input with item name
          if (!guideline.active) {
            setFIStatus(false);
            //dispatch(unselectItem());
          }
          // check if current item to draw is association, if true then reset
          // guideline props
          if (itemType?.includes(ASSOCIATION.KEY) && guideline.active) {
            setDefaultGuidelineState();
          }
        }
      }
    } catch (err) {
      const msj = 'Error in ' + MODULE_NAME;
      if (process.env.NODE_ENV === 'development') console.error(MODULE_NAME, err);
      snackbar({ module: MODULE_NAME, msj, variant: 'warning' });
    }
  };

  // check if current target has id, item is active and others
  // canvas props, if true change current item
  // this is for handle association connections and other stuffs
  const handlePointerOver = useCallback(
    ({ target: { id } }) => {
      if (!id || !id?.includes('_') || item.active) return;
      if (!isPointerOnCanvas) setIsPointerOnCanvas(true);
      if (currSelect.id !== id && !fIStatus) {
        const { type, connections } = findItemById({ id });
        setCurrSelect({ id, type, connections });
      }
    },
    [item, currSelect, fIStatus, findItemById, setCurrSelect]
  );

  // check if current target has id, item is active and others
  // canvas props, if true change last item
  // this is for handle association connections and other stuffs
  const handlePointerOut = useCallback(
    ({ target: { id } }) => {
      if (!id || !id?.includes('_') || item.active) return;
      if (isPointerOnCanvas) setIsPointerOnCanvas(false);
      cleanCurrSelect();
      if (lastSelect.id !== id && !fIStatus) {
        const { type, connections } = findItemById({ id });
        setLastSelect({ id, type, connections });
      }
    },
    [item, lastSelect, fIStatus, cleanCurrSelect, findItemById, setLastSelect]
  );

  useEventListener('pointerover', handlePointerOver);
  useEventListener('pointerout', handlePointerOut);

  return (
    <Box
      classes={canvasStyles}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={ref}
    >
      <GridLines cellWidth={60} strokeWidth={2} cellWidth2={12}>
        <Canvas />
        <FabItem />
        <FloatingInput />
      </GridLines>
    </Box>
  );
};

CanvasContainer.propTypes = {};
CanvasContainer.defaultProps = {};

export default CanvasContainer;
