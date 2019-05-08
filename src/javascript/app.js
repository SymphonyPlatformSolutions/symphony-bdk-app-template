/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { APP_ID, APP_TITLE } from '../utils/app-constants';
import configureStore from '../store/store-config';
import Routes from '../routes/routes';
import '../sass/main.scss';

const appService = SYMPHONY.services.register(`${APP_ID}:app`);

SYMPHONY.remote.hello().then((data) => {
  let themeColor = data.themeV2.name;
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app ${themeColor.toLowerCase()} ${themeSize}`;

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
        themeColor = theme.themeV2.name;
        themeSize = theme.themeV2.size;
        document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
      }).catch((error) => {
        throw new Error('Unable to Configure the Extension App theme', error);
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
          <Routes userId={userId} jwtService={extendedUserInfoService} />
        </div>
      </Provider>, document.getElementById('root'),
    );
  }).catch((error) => {
    throw new Error('Unable to connect the application on client', error);
  });
}).catch((error) => {
  throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
});
