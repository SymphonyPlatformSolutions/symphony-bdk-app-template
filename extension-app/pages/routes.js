import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';
import LocationRouter from './location-router';

const LINK_PREFIX = setupLinkPrefix();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={`${LINK_PREFIX}/app.html`} component={LocationRouter} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
