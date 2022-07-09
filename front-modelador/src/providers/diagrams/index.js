import { useContext } from 'react';
import { default as Context } from '@providers/diagrams/Context';
export { default } from '@providers/diagrams/Provider';

export function useDiagrams() {
  return useContext(Context);
}
