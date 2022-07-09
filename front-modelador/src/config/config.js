import { default as apiConfig } from '@config/api';
import { default as auth0Config } from '@config/auth0';
import { default as themes } from '@config/themes';
import { default as tabs } from '@config/tabs';
import { nav0, nav1, extra } from '@config/nav';
import { modal } from '@config/modal';

const config = {
  api: apiConfig,
  auth0: auth0Config,
  theme: themes,
  subheader: {
    tabsData: tabs,
  },
  nav: {
    0: nav0,
    1: nav1,
    extra,
  },
  modal: modal,
};

export default config;
