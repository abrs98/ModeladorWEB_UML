import { createMuiTheme } from '@material-ui/core/styles';
import config from '@config';

const theme = createMuiTheme(
  config.theme.find((theme) => theme.id === 'default').source
);

export default theme;
