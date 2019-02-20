/* global SYMPHONY */

import { initApp } from 'symphony-app-authentication-fe';
import { setupURL, setupControllerURL } from '../utils/setup-url';
import GeneralEnricher from '../services/general-enricher';

const templateControllerService = SYMPHONY.services.register('template:controller');
SYMPHONY.services.register('template:controller');
SYMPHONY.services.register('template:enricher');

const controllers = ['template:controller', 'template:enricher'];
const authenticationURL = setupURL();
const CONTROLLER_PREFIX = setupControllerURL();

const config = {
  appId: 'template',
  dependencies: ['modules', 'applications-nav', 'ui', 'entity'],
  exportedDependencies: controllers,
  baseAuthenticationUrl: authenticationURL,
};

const bootstrap = () => {
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  const uiService = SYMPHONY.services.subscribe('ui');
  SYMPHONY.services.subscribe('entity');
  const entityService = SYMPHONY.services.subscribe('entity');
  const enricher = new GeneralEnricher('template:enricher', [
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
  templateControllerService.implement({
    trigger() {
      const configUrl = `https://${CONTROLLER_PREFIX}/app.html?queryObj={"page": "config"}`;

      modulesService.show(
        'template',
        {
          title: 'template',
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        'template:controller',
        configUrl,
        { canFloat: true },
      );
    },
  });

  const navSettings = {
    title: 'template',
    icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
  };
  navService.add('template-nav', navSettings, 'template:controller');
  uiService.registerExtension('app-settings', 'template', 'template:controller', { label: 'Configure' });

  templateControllerService.implement({
    select(id) {
      if (id === 'template-nav') {
        navService.focus('template-nav');
      }
      modulesService.show(
        'template',
        {
          title: 'template',
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        'template:controller',
        `https://${CONTROLLER_PREFIX}/app.html`,
        {
          canFloat: true,
        },
      );
      modulesService.focus('template');
    },
  });
};

initApp(config)
  .then(() => bootstrap())
  .fail(e => console.error(e));
