import { useLayoutEffect, useState } from 'react';

/**
 * Hook that returns the current window size.
 */
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = (e) => {
      setSize([window.innerWidth - 270, window.innerHeight - 150]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default useWindowSize;
