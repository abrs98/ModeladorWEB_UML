import { useContext } from 'react';
import { default as Context } from './Context';
export { default } from './Provider';

export function useUser() {
  return useContext(Context);
}
