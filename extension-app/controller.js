/* global SYMPHONY */
// import { initApp } from 'symphony-app-authentication-fe';
import Index from 'services/controller/authentication';
import { frontendURL, setupURL, setupLinkPrefix } from 'utils/system/setup-url';
import GeneralEnricher from 'services/enrichers/general-enricher';
import { ENRICHER_EVENTS, MODAL_IDS } from 'services/enrichers/entities';
import Api from 'services/api';
import { showExtensionApp } from 'services/controller/extension-app';
import { parseStreamIdToBackend } from 'utils/helpers/help-functions';

const { APP_ID, APP_NAV_BAR_TITLE, APP_ICON_NAME } = window.APP_CONFIG;
// These next 4 lines will be removed on production
/* develblock:start */
window.ENRICHER_EVENTS = ENRICHER_EVENTS;
window.MODAL_IDS = MODAL_IDS;
/* develblock:end */

const controllerService = SYMPHONY.services.register(`${APP_ID}:controller`);
SYMPHONY.services.register(`${APP_ID}:enricher`);
const controllers = [`${APP_ID}:controller`, `${APP_ID}:enricher`];
const FRONTEND_SERVE_URL = frontendURL();
const LINK_PREFIX = setupLinkPrefix();
const AUTH_URL = setupURL();

const config = {
  appId: APP_ID,
  dependencies: [
    'modules',
    'applications-nav',
    'ui',
    'entity',
    'dialogs',
    'extended-user-info',
  ],
  exportedDependencies: controllers,
  baseAuthenticationUrl: AUTH_URL,
};

const authController = new Index(config);

const bootstrap = () => {
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  const uiService = SYMPHONY.services.subscribe('ui');
  SYMPHONY.services.subscribe('entity');
  const extendedUserInfoService = SYMPHONY.services.subscribe(
    'extended-user-info',
  );
  extendedUserInfoService.getJwt().then((jwt) => {
    Api.setJwt(jwt);
    Api.get('/v1/sym/rooms').then((response) => {
      window.botRooms = response.data;
    });
    Api.get('/v1/sym/bot-info').then((response) => {
      window.botUsername = response.data.username;
    });
  });
  const enricher = new GeneralEnricher(`${APP_ID}:enricher`);
  enricher.init();
  enricher.register();

  const navSettings = {
    title: APP_NAV_BAR_TITLE,
    icon: `${FRONTEND_SERVE_URL}${LINK_PREFIX}/assets/${APP_ICON_NAME}`,
  };
  navService.add(`${APP_ID}-nav`, navSettings, `${APP_ID}:controller`);
  uiService.registerExtension('app-settings', APP_ID, `${APP_ID}:controller`, {
    label: 'Configure',
  });

  controllerService.implement({
    select(id) {
      if (id === `${APP_ID}-nav`) {
        navService.focus(`${APP_ID}-nav`);
      }
      showExtensionApp();
      modulesService.focus(APP_ID);
    },
    filter(type, id, data) {
      const parsedThreadId = parseStreamIdToBackend(data.threadId);
    },
    trigger(uiClass, id, payload, data) {
      switch (id) {
        default:
          break;
      }
    },
  });
};

authController
  .init()
  .then(() => bootstrap())
  .catch(e => console.error(e));
