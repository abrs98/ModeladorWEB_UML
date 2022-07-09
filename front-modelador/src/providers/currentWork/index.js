import { useContext } from 'react';
import { default as Context } from '@providers/currentWork/Context';
export { default } from '@providers/currentWork/Provider';

export function useCurrentWork() {
  return useContext(Context);
}
