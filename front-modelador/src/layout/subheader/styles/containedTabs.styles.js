import { makeStyles, createStyles } from '@material-ui/core/styles';

const paperCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: palette.background.paper,
    },
  });
export const usePaperStyles = makeStyles(paperCreateStyles);

const tabsCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      minHeight: 'auto',
    },
    indicator: {
      display: 'none',
    },
  });
export const useTabsStyles = makeStyles(tabsCreateStyles);

const tabItemCreateStyles = ({ palette, breakpoints }) =>
  createStyles({
    root: {
      opacity: 1,
      overflow: 'initial',
      color: palette.text.primary,
      backgroundColor: palette.common.white,
      transition: '0.2s',
      minHeight: 'auto',
      [breakpoints.down('xl')]: {
        minWidth: 220,
      },
      [breakpoints.down('lg')]: {
        minWidth: 180,
      },
      [breakpoints.down('md')]: {
        minWidth: 140,
      },
      [breakpoints.down('sm')]: {
        minWidth: 120,
      },
      [breakpoints.down('xs')]: {
        minWidth: 80,
      },
      '&:before': {
        transition: '0.2s',
      },
      '&:not(:first-of-type)': {
        '&:before': {
          content: '" "',
          position: 'absolute',
          left: 0,
          display: 'block',
          height: 20,
          width: 1,
          zIndex: 1,
          backgroundColor: palette.grey[300],
        },
      },
      '& + $selected:before': {
        opacity: 0,
      },
      '&:hover': {
        '&::before': {
          opacity: 0,
        },
        '& + $root:before': {
          opacity: 0,
        },
      },
    },
    selected: {
      backgroundColor: palette.primary.main,
      color: palette.common.white,
      '& + $root': {
        zIndex: 1,
      },
      '& + $root:before': {
        opacity: 0,
      },
    },
    wrapper: {
      zIndex: 2,
      textTransform: 'initial',
    },
  });
export const useTabItemStyles = makeStyles(tabItemCreateStyles);
