/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Logger from 'services/logger';
import configureStore from '../../extension-app/reducers';
import Routes from '../../extension-app/pages/routes';
import { APP_ID, APP_TITLE } from '../../extension-app/utils/system/app-constants';
import { handleOutline } from '../../extension-app/utils/helpers/help-functions';
import '../../extension-app/public/sass/main.scss';
import '../symphony-mock';

handleOutline(); // Accessibility

Logger.setAppTitle(APP_TITLE);

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((data) => {
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app light ${themeSize}`;

  SYMPHONY.application.connect(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'dialogs', 'extended-user-service'],
    [`${APP_ID}:app`],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const uiService = SYMPHONY.services.subscribe('ui');

    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((theme) => {
        themeSize = theme.themeV2.size;
        document.body.className = `symphony-external-app light ${themeSize}`;
      });
    });

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
        <div>
          <Routes userId={userId} jwtService={undefined} />
        </div>
      </Provider>,
      document.getElementById('root'),
    );
  }).catch((error) => {
    Logger.error('Unable to connect the application on client', error);
  });
}).catch((error) => {
  Logger.error('Unable to reach the data for Extension App, please verify the Authentication with Server.', error);
});
