import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupLinkPrefix } from '../utils/setup-url';
import App from '../pages/app';

const LINK_PREFIX = setupLinkPrefix();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${LINK_PREFIX}/app.html`} component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
