import { useContext } from 'react';
import { default as Context } from '@providers/snackbar/Context';
export { default } from '@providers/snackbar/Provider';

export function useSnackbar() {
  return useContext(Context);
}
