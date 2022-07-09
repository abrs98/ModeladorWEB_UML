import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';

import { default as LayoutApp } from '@layout/App';
import { PrivateRoute } from '@layout/common/components';
import { default as ProvidersContainer } from '@layout/common/ProvidersContainer';
import * as serviceWorker from './serviceWorker';
import './polyfill';

ReactDOM.render(
  <ProvidersContainer>
    <BrowserRouter>
      <Switch>
        <LayoutApp/>
      </Switch>
    </BrowserRouter>
  </ProvidersContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();  
