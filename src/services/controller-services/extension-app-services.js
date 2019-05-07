/* global SYMPHONY */

import { setupLinkPrefix, frontendURL } from '../../utils/setup-url';
import { APP_ID, APP_TITLE } from '../../utils/app-constants';

export function showExtensionApp(overrideUrl, overrideIconUrl = null) {
  const modulesService = SYMPHONY.services.subscribe('modules');
  const configUrl = overrideUrl || `${frontendURL()}${setupLinkPrefix()}/app.html`;
  const iconUrl = overrideIconUrl || `${frontendURL()}${setupLinkPrefix()}/assets/app-icon.png`;

  modulesService.show(
    APP_ID,
    { title: APP_TITLE, icon: iconUrl },
    `${APP_ID}:controller`,
    configUrl,
    { canFloat: true },
  );
}
