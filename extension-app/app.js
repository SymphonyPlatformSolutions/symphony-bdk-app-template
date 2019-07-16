/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './reducers';
import { APP_ID, APP_TITLE } from './utils/system/app-constants';
import Routes from './pages/routes';
import { handleOutline, sleepFor } from './utils/helpers/help-functions';
import './public/sass/main.scss';
import envs from 'utils/system/envs-constants';

const { currEnv } = process.env;

handleOutline(); // Accessibility

let MOCK_USER_SERVICE = null;

// These next 6 lines will be removed on production
/* develblock:start */
if (currEnv === envs.MOCK) {
  sleepFor(1000);
}

MOCK_USER_SERVICE = {
  getJwt: () => new Promise(Resolve => Resolve('NO JWT')),
};

/* develblock:end */

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((data) => {
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app light ${themeSize}`;

  SYMPHONY.application.connect(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service'],
    [`${APP_ID}:app`],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const uiService = SYMPHONY.services.subscribe('ui');
    const extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');

    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((theme) => {
        themeSize = theme.themeV2.size;
        document.body.className = `symphony-external-app light ${themeSize}`;
      });
    });

    modulesService.addMenuItem(APP_ID, `About ${APP_TITLE}`, `${APP_ID}-menu-item`);
    modulesService.setHandler(APP_ID, `${APP_ID}:app`);
    appService.implement({
      menuSelect: (itemId) => {
        if (itemId === `${APP_ID}-menu-item`) {
          document.getElementById(`about-${APP_ID}-app`).className = '';
        }
      },
    });

    const store = configureStore();
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Routes userId={userId} jwtService={MOCK_USER_SERVICE || extendedUserInfoService} />
        </div>
      </Provider>, document.getElementById('root'),
    );
  }).catch((error) => {
    throw new Error('Unable to connect the application on client', error);
  });
}).catch((error) => {
  throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
});
