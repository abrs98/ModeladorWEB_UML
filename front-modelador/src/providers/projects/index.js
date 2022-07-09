import { useContext } from 'react';
import { default as Context } from '@providers/projects/Context';
export { default } from '@providers/projects/Provider';

export function useProjects() {
  return useContext(Context);
}
