import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  overlayItem: {
    width: 50,
    height: 50,
    position: 'fixed',
    zIndex: 4,
  },
}));

export default useStyles;
