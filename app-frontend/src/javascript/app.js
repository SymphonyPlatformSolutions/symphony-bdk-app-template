/* global SYMPHONY */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/store-config';
import '../sass/main.scss';
import Routes from '../routes/routes';

const confluenceAppService = SYMPHONY.services.register('confluence:app');

SYMPHONY.remote.hello().then((data) => {
  let themeColor = data.themeV2.name;
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app ${themeColor.toLowerCase()} ${themeSize}`;

  SYMPHONY.application.connect(
    'confluence',
    ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service'],
    ['confluence:app'],
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

    modulesService.addMenuItem('confluence', 'About Confluence', 'confluence-menu-item');
    modulesService.setHandler('confluence', 'confluence:app');
    confluenceAppService.implement({
      menuSelect: (itemId) => {
        if (itemId === 'confluence-menu-item') {
          document.getElementById('about-confluence-app').className = '';
        }
      },
    });
    const store = configureStore();

    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Routes
            userId={userId}
            jwtService={extendedUserInfoService}
          />
        </div>
      </Provider>,
      document.getElementById('root'),
    );
  });
});
