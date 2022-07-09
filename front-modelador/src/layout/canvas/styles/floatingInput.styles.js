import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    position: 'absolute',
    zIndex: 1,
    fontSize: '15px',
    borderRadius: '1px',
    borderStyle: 'solid',
    borderWidth: '1px',
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
}));

export default useStyles;
