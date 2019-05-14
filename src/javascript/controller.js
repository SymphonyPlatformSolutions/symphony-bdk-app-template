/* global SYMPHONY */
// import { initApp } from 'symphony-app-authentication-fe';
import AuthenticationController from '../services/controller-services/authentication-controller';
import { frontendURL, setupURL, setupLinkPrefix } from '../utils/setup-url';
import GeneralEnricher from '../services/enrichers/general-enricher';
import { APP_ID, APP_NAV_BAR_TITLE, APP_ICON_NAME } from '../utils/app-constants';
import { showExtensionApp } from '../services/controller-services/extension-app-services';

const controllerService = SYMPHONY.services.register(`${APP_ID}:controller`);
SYMPHONY.services.register(`${APP_ID}:enricher`);
const controllers = [`${APP_ID}:controller`, `${APP_ID}:enricher`];
const FRONTEND_SERVE_URL = frontendURL();
const AUTH_URL = setupURL();
const LINK_PREFIX = setupLinkPrefix();

const config = {
  appId: APP_ID,
  dependencies: ['modules', 'applications-nav', 'ui', 'entity', 'dialogs'],
  exportedDependencies: controllers,
  baseAuthenticationUrl: AUTH_URL,
};

const authController = new AuthenticationController(config);

const bootstrap = () => {
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  const uiService = SYMPHONY.services.subscribe('ui');
  SYMPHONY.services.subscribe('entity');
  const enricher = new GeneralEnricher(`${APP_ID}:enricher`);

  enricher.init();
  enricher.register();

  const navSettings = {
    title: APP_NAV_BAR_TITLE,
    icon: `${FRONTEND_SERVE_URL}/template/app/assets/${APP_ICON_NAME}`,
  };
  navService.add(`${APP_ID}-nav`, navSettings, `${APP_ID}:controller`);
  uiService.registerExtension('app-settings', APP_ID, `${APP_ID}:controller`, { label: 'Configure' });

  controllerService.implement({
    select(id) {
      if (id === `${APP_ID}-nav`) {
        navService.focus(`${APP_ID}-nav`);
      }
      showExtensionApp();
      modulesService.focus(APP_ID);
    },
    trigger(uiClass) {
      if (uiClass === 'app-settings') {
        showExtensionApp(`${FRONTEND_SERVE_URL}${LINK_PREFIX}/app.html?queryObj={"page":"config"}`);
      }
    },
  });
};

authController.init()
  .then(() => bootstrap())
  .fail(e => console.error(e));
