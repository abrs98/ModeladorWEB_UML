import { useEffect, useState } from 'react';

/**
 * Hook that returns current mouse position (global and local).
 */
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    mouseGlobal: {
      x: -1,
      y: -1,
    },
    mouseLocal: {
      x: -1,
      y: -1,
    }
  });

  const updateMousePosition = (e) => {
    setMousePosition({
      mouseGlobal: { x: e.clientX, y: e.clientY },
      mouseLocal: { x: window.event.offsetX, y: window.event.offsetY },
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMousePosition;
