import { useEffect, useState } from 'react';

/**
 * This is used for get the mouser/touch/pointer coordinates
 * your will get a global and local coords, with global refers to
 * the position in all windows renderer, and local refers to
 * position in current element renderer.
 * @ref https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
 * @return coords object
 */
const usePointerCoords = () => {
  const [coords, setCoords] = useState({
    pointerGlobal: {
      x: -1,
      y: -1,
    },
    pointerLocal: {
      x: -1,
      y: -1,
    },
  });

  const updateCoords = (e) => {
    setCoords({
      pointerGlobal: { x: e.clientX, y: e.clientY },
      pointerLocal: { x: window.event.offsetX, y: window.event.offsetY },
    });
  };

  useEffect(() => {
    window.addEventListener('pointerdown', updateCoords);

    return () => {
      window.removeEventListener('pointerdown', updateCoords);
    };
  }, []);

  return coords;
};

export default usePointerCoords;
