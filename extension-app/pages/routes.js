import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sample from './sample';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${LINK_PREFIX}/app.html`} component={Sample} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
