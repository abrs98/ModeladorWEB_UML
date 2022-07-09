import { useContext } from 'react';
import { default as Context } from '@providers/guidelineProperties/Context';
export { default } from '@providers/guidelineProperties/Provider';

export function useGuidelineProps() {
  return useContext(Context);
}
