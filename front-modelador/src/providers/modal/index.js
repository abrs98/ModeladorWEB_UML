import { useContext } from 'react';
import { default as Context } from '@providers/modal/Context';
export { default } from '@providers/modal/Provider';

export function useModal() {
  return useContext(Context);
}
