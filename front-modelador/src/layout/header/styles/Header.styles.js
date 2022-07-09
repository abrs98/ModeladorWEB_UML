import { makeStyles, createStyles } from '@material-ui/core/styles';

const headerCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: palette.background.paper,
    },
    titleStyle: {
      fontWeight: 700,
      minWidth: 0,
      fontSize: 16,
    },
    iconStyle: {
      marginRight: '7px',
    },
  });
export const useHeaderStyles = makeStyles(headerCreateStyles);
