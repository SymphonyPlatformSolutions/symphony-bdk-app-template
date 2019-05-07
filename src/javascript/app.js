/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from '../routes/routes';

SYMPHONY.remote.hello().then((data) => {
  let themeColor = data.themeV2.name;
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app ${themeColor.toLowerCase()} ${themeSize}`;

  SYMPHONY.application.connect(
    `${appId}`,
    ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service'],
    [`${appId}:app`],
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
      });
    });

    modulesService.addMenuItem(`${appName}`, 'About', `${appName}-menu-item`);
    modulesService.setHandler(`${appName}`, `${appId}:app`);
    templateAppService.implement({
      menuSelect: (itemId) => {
        if (itemId === `${appName}-menu-item`) {
          document.getElementById(`about-${appName}-app`).className = '';
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
  });
});
