import { useContext } from 'react';
import { default as Context } from '@providers/panel/Context';
export { default } from '@providers/panel/Provider';

export function usePanel() {
  return useContext(Context);
}
