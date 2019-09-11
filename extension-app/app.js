/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { THEME_TYPES, Logger } from 'sms-sdk-toolbox-ui';
import configureStore from './reducers';
import { APP_ID, APP_TITLE } from './utils/system/app-constants';
import Routes from './pages/routes';
import { handleOutline } from './utils/helpers/help-functions';
import './public/sass/main.scss';

Logger.setEnv({
  appTitle: 'Template extension app',
  environment: 'DEV',
  apiUrl: null,
  debugLevel: 1,
});

handleOutline(); // Accessibility

let MOCK_USER_SERVICE = null;

// These next 3 lines will be removed on production
/* develblock:start */
MOCK_USER_SERVICE = {
  getJwt: () => new Promise(Resolve => Resolve('NO JWT')),
};
/* develblock:end */

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((data) => {
  const themeSize = data.themeV2.size;
  const themeColor = data.themeV2.name;
  document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
  const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
    ? THEME_TYPES.DARK
    : themeColor.toUpperCase() === THEME_TYPES.LIGHT
      ? THEME_TYPES.LIGHT
      : THEME_TYPES.LIGHT;
  window.themeColor = appTheme;
  window.themeSize = themeSize;

  SYMPHONY.application.connect(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service', 'dialogs'],
    [`${APP_ID}:app`],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');

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
        <Routes userId={userId} jwtService={MOCK_USER_SERVICE} />
      </Provider>, document.getElementById('root'),
    );
  }).catch((error) => {
    throw new Error('Unable to connect the application on client', error);
  });
}).catch((error) => {
  throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
});
