import { useContext } from 'react';
import { default as Context } from '@providers/tdiagrams/Context';
export { default } from '@providers/tdiagrams/Provider';

export function useTDiagrams() {
  return useContext(Context);
}
