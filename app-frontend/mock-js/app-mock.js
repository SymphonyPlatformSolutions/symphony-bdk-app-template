/* global SYMPHONY */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../src/store/store-config';
import '../src/sass/main.scss';
import Routes from '../src/routes/routes';

const templateAppService = SYMPHONY.services.register('template:app');

SYMPHONY.remote.hello().then((data) => {
  let themeColor = data.themeV2.name;
  let themeSize = data.themeV2.size;
  document.body.className = `symphony-external-app ${themeColor.toLowerCase()} ${themeSize}`;

  SYMPHONY.application.connect(
    'template',
    ['modules', 'applications-nav', 'ui', 'extended-user-service'],
    ['template:app'],
  ).then((response) => {
    const userId = response.userReferenceId;
    const modulesService = SYMPHONY.services.subscribe('modules');
    const uiService = SYMPHONY.services.subscribe('ui');

    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((theme) => {
        themeColor = theme.themeV2.name;
        themeSize = theme.themeV2.size;
        document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
      });
    });

    modulesService.addMenuItem('template', 'About template', 'template-menu-item');
    modulesService.setHandler('template', 'template:app');
    templateAppService.implement({
      menuSelect: (itemId) => {
        if (itemId === 'template-menu-item') {
          document.getElementById('about-template-app').className = '';
        }
      },
    });
    const store = configureStore();
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <Routes
            userId={userId}
            jwtService={undefined}
          />
        </div>
      </Provider>,
      document.getElementById('root'),
    );
  });
});
