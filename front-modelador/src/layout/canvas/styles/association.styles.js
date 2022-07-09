import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  association: {
    fill: 'none',
    stroke: '#0A0500',
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
    strokeWidth: 2,
  },
  associationSelected: {
    stroke: '#009BFF',
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
    strokeWidth: 6,
  },
  associationNav: {
    markerEnd: 'url(#ASSOCIATION_NAV)',
    fill: 'none',
    stroke: '#0A0500',
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
    strokeWidth: 2,
  },
  associationNavSelected: {
    markerEnd: 'url(#ASSOCIATION_NAV_SELECTED)',
    stroke: '#009BFF',
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
    strokeWidth: 6,
  },
  text: {
    fontFamily: 'Verdana',
    fontSize: 15,
    fill: '#0A0500',
    stroke: 'none',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    '-webkit-user-select': 'none' /* Safari */,
    '-khtml-user-select': 'none' /* Konqueror HTML */,
    '-moz-user-select': 'none' /* Old versions of Firefox */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',
  },
}));

export default useStyles;
