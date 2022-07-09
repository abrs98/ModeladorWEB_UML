import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  selected: {
    stroke: '#009bff',
    strokeWidth: 1,
  },
  deselected: {
    stroke: '#00000000',
    strokeWidth: 1,
  },
  text: {
    fontFamily: 'Vendeta',
    fontSize: 15,
    fill: '#0a0500',
    stroke: 'none',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    '-webkit-user-select': 'none' /* Safari */,
    '-khtml-user-select': 'none' /* Konqueror HTML */,
    '-moz-user-select': 'none' /* Old versions of Firefox */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select':
      'none' /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
  },
}));

export default useStyles;
