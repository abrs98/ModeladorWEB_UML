import { useContext } from 'react';
import { default as Context } from '@providers/sidebar/Context';
export { default } from '@providers/sidebar/Provider';

export function useSidebar() {
  return useContext(Context);
}
