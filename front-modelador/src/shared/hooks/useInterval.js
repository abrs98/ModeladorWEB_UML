import { useEffect, useRef } from 'react';

/**
 * Hook that creates an observer to specific callback with delay settable.
 */
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // remember the lastest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (tick !== null) {
      const id = setInterval(callback, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};

export default useInterval;
