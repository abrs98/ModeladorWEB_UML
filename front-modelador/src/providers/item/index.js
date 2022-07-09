import { useContext } from 'react';
import { default as Context } from '@providers/item/Context';
export { default } from '@providers/item/Provider';

export function useItem() {
  return useContext(Context);
}
