import { makeStyles, createStyles } from '@material-ui/core/styles';

const canvasCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: 'whitesmoke',
      height: '100%',
      width: '100%',
      border: '1px solid rgb(190, 192, 196)',
      boxShadow: '3px 3px 10px 2px rgba(193, 174, 151, 0.38)',
      zIndex: 1,
    },
  });
export const useCanvasStyles = makeStyles(canvasCreateStyles);
