/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { APP_ID, APP_TITLE } from '../utils/app-constants';
import configureStore from '../store/store-config';
import Routes from '../routes/routes';
import { handleOutline } from '../utils/help-functions';
import '../sass/main.scss';
import Logger from '../services/logger/logger';
import ThemeProvider from '../components/theme/theme-provider';

handleOutline(); // Accessibility

Logger.setAppTitle(APP_TITLE);

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((initialData) => {
  const initialTheme = initialData.themeV2;
  document.body.className = `integration-app-body ${initialTheme.name.toLowerCase()} ${initialTheme.size}`;

  SYMPHONY.application.connect(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service'],
    [`${APP_ID}:app`],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const uiService = SYMPHONY.services.subscribe('ui');
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
        <ThemeProvider uiService={uiService} theme={initialTheme}>
          <div>
            <Routes userId={userId} jwtService={extendedUserInfoService} />
          </div>
        </ThemeProvider>
      </Provider>, document.getElementById('root'),
    );
  }).catch((error) => {
    Logger.error('Unable to connect the application on client', error);
    throw new Error('Unable to connect the application on client', error);
  });
}).catch((error) => {
  Logger.error('Unable to reach the data for the Extension App, please verify the Authentication with Server', error);
  throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
});
