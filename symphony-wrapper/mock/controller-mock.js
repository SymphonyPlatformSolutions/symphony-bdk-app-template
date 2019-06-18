/* global SYMPHONY */
import GeneralEnricher from '../../extension-app/services/enrichers/general-enricher';
import { APP_ID, APP_NAV_BAR_TITLE, APP_ICON_NAME } from '../../extension-app/utils/system/app-constants';
import { setupLinkPrefix, frontendURL } from '../../extension-app/utils/system/setup-url';
import { showExtensionApp } from '../../extension-app/services/controller/extension-app';
import '../symphony-mock';

const controllerService = SYMPHONY.services.register(`${APP_ID}:controller`);
SYMPHONY.services.register(`${APP_ID}:enricher`);

const FRONTEND_SERVE_URL = frontendURL();
const LINK_PREFIX = setupLinkPrefix();

SYMPHONY.remote.hello().then(() => {
  SYMPHONY.application.register(
    APP_ID,
    ['modules', 'applications-nav', 'ui', 'entity', 'dialogs', 'extended-user-info'],
    [`${APP_ID}:controller`, `${APP_ID}:enricher`],
  ).then(() => {
    const modulesService = SYMPHONY.services.subscribe('modules');
    const navService = SYMPHONY.services.subscribe('applications-nav');
    const uiService = SYMPHONY.services.subscribe('ui');
    SYMPHONY.services.subscribe('entity');
    const enricher = new GeneralEnricher(`${APP_ID}:enricher`, GeneralEnricher.getMessages());

    enricher.init();
    enricher.register();
    uiService.registerExtension('app-settings', APP_ID, `${APP_ID}:controller`, { label: 'Configure' });

    const navSettings = {
      title: APP_NAV_BAR_TITLE,
      icon: `https://localhost:4000/assets/${APP_ICON_NAME}`,
    };

    navService.add(`${APP_ID}-nav`, navSettings, `${APP_ID}:controller`);
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
  }).catch((error) => {
    console.error('Unable to register the Controller Application', error);
  });
}).catch((error) => {
  console.error('Unable to register the Controller Application', error);
});
