/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../src/store/store-config';
import Routes from '../src/routes/routes';
import { APP_ID, APP_TITLE } from '../src/utils/app-constants';
import { handleOutline } from '../src/utils/help-functions';
import Logger from '../src/services/logger/logger';
import '../src/sass/main.scss';
import ThemeProvider from '../src/components/theme/theme-provider';

handleOutline(); // Accessibility

Logger.setAppTitle(APP_TITLE);

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((initialData) => {
  const initialTheme = initialData.themeV2;
  document.body.className = `integration-app-body ${initialTheme.name.toLowerCase()} ${initialTheme.size}`;

  SYMPHONY.application.connect(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'dialogs', 'extended-user-service'],
    [`${APP_ID}:app`],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const uiService = SYMPHONY.services.subscribe('ui');

    modulesService.addMenuItem(APP_ID, `About ${APP_TITLE}`, `${APP_ID}-menu-item`, 'extended-user-info');
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
            <Routes userId={userId} jwtService={undefined} />
          </div>
        </ThemeProvider>
      </Provider>,
      document.getElementById('root'),
    );
  }).catch((error) => {
    Logger.error('Unable to connect the MOCK application on client', error);
  });
}).catch((error) => {
  Logger.error('Unable to reach the data for the MOCK Extension App, please verify the Authentication with Server', error);
});
