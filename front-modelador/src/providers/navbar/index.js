import { useContext } from 'react';
import { default as Context } from '@providers/navbar/Context';
export { default } from '@providers/navbar/Provider';

export function useNavbar() {
  return useContext(Context);
}
