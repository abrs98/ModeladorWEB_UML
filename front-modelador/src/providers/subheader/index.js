import { useContext } from 'react';
import { default as Context } from '@providers/subheader/Context';
export { default } from '@providers/subheader/Provider';

export function useSubheader() {
  return useContext(Context);
}
