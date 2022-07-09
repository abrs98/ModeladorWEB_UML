import { makeStyles, createStyles } from '@material-ui/core/styles';

const contentCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 16,
      alignContent: 'center',
      [breakpoints.up('sm')]: {
        padding: 24,
        maxWidth: 500,
        margin: 0,
      },
      [breakpoints.up('md')]: {
        maxWidth: 700,
      },
    },
  });
export const useContentStyles = makeStyles(contentCreateStyles);

const paperCreateStyles = ({ palette, breakpoints, spacing }) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: spacing(1),
      height: '100%',
    },
  });
export const usePaperStyles = makeStyles(paperCreateStyles);
