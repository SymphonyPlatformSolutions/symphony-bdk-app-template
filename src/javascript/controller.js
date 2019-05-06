/* global SYMPHONY */

import { initApp } from 'symphony-app-authentication-fe';
import { setupURL, setupControllerURL } from '../utils/setup-url';
import GeneralEnricher from '../services/general-enricher';

const appId = <%- appId %>;
const controllerService = SYMPHONY.services.register(`${appId}:controller`);
SYMPHONY.services.register(`${appId}:controller`);
SYMPHONY.services.register(`${appId}:enricher`);

const controllers = [`${appId}:controller`, `${appId}:enricher`];
const authenticationURL = setupURL();
const CONTROLLER_PREFIX = setupControllerURL();

const config = {
  appId: appId,
  dependencies: ['modules', 'applications-nav', 'ui', 'entity'],
  exportedDependencies: controllers,
  baseAuthenticationUrl: authenticationURL,
};

const bootstrap = () => {
  SYMPHONY.services.subscribe('entity');
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  const uiService = SYMPHONY.services.subscribe('ui');
  const entityService = SYMPHONY.services.subscribe('entity');
  const enricher = new GeneralEnricher(`${appId}:enricher`, [
    'org.symphony.ms.devtools.myEntity',
  ]);

  enricher.init();
  enricher.register();

  entityService.registerRenderer(
    'com.symphony.timer',
    {},
    'message:controller',
  );

  // FOR USE ON ROUTES
  contollerService.implement({
    trigger() {
      const configUrl = `https://${CONTROLLER_PREFIX}/app.html?queryObj={"page": "config"}`;

      modulesService.show(
        `${appId}`,
        {
          title: `${appId}`,
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        `${appId}:controller`,
        configUrl,
        { canFloat: true },
      );
    },
  });

  const navSettings = {
    title: `${appId}`,
    icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
  };
  navService.add(`${appId}-nav`, navSettings, `${appId}:controller`);
  uiService.registerExtension('app-settings', `${appId}`, `${appId}:controller`, { label: 'Configure' });

  contollerService.implement({
    select(id) {
      if (id === `${appId}-nav`) {
        navService.focus(`${appId}-nav`);
      }
      modulesService.show(
        `${appId}`,
        {
          title: `${appId}`,
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        `${appId}:controller`,
        `https://${CONTROLLER_PREFIX}/app.html`,
        {
          canFloat: true,
        },
      );
      modulesService.focus(`${appId}`);
    },
  });
};

initApp(config)
  .then(() => bootstrap())
  .fail(e => console.error(e));
