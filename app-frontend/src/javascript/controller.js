/* global SYMPHONY */
import { initApp } from 'symphony-app-authentication-fe';
import { setupURL, setupControllerURL } from '../utils/setup-url';
import GeneralEnricher from '../services/general-enricher';

const confluenceControllerService = SYMPHONY.services.register('confluence:controller');
SYMPHONY.services.register('confluence:controller');
SYMPHONY.services.register('confluence:enricher');

const controllers = ['confluence:controller', 'confluence:enricher'];
const authenticationURL = setupURL();
const CONTROLLER_PREFIX = setupControllerURL();

const config = {
  appId: 'confluence',
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
  const enricher = new GeneralEnricher('confluence:enricher', [
    'org.symphony.ms.devtools.confluence.page',
    'org.symphony.ms.devtools.confluence.blogpost',
    'org.symphony.ms.devtools.confluence.loginResponse',
  ]);

  enricher.init();
  enricher.register();

  entityService.registerRenderer(
    'com.symphony.timer',
    {},
    'message:controller',
  );

  // FOR USE ON ROUTES
  confluenceControllerService.implement({
    trigger() {
      const configUrl = `https://${CONTROLLER_PREFIX}/app.html?queryObj={"page": "config"}`;

      modulesService.show(
        'confluence',
        {
          title: 'Confluence',
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        'confluence:controller',
        configUrl,
        { canFloat: true },
      );
    },
  });

  const navSettings = {
    title: 'Confluence',
    icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
  };
  navService.add('confluence-nav', navSettings, 'confluence:controller');
  uiService.registerExtension('app-settings', 'confluence', 'confluence:controller', { label: 'Configure' });

  confluenceControllerService.implement({
    select(id) {
      if (id === 'confluence-nav') {
        navService.focus('confluence-nav');
      }
      modulesService.show(
        'confluence',
        {
          title: 'Confluence',
          icon: `https://${CONTROLLER_PREFIX}/assets/app-icon.svg`,
        },
        'confluence:controller',
        `https://${CONTROLLER_PREFIX}/app.html`,
        {
          canFloat: true,
        },
      );
      modulesService.focus('confluence');
    },
  });
};

initApp(config)
  .then(() => bootstrap())
  .fail(e => console.error(e));
