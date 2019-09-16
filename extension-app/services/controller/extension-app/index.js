/* global SYMPHONY */

import { setupLinkPrefix, frontendURL } from 'utils/system/setup-url';
import { APP_ID, APP_TITLE, APP_ICON_NAME } from 'utils/system/app-constants';

export function showExtensionApp(appendQueryObject = null, overrideUrl, overrideIconUrl = null) {
  const modulesService = SYMPHONY.services.subscribe('modules');
  let configUrl = overrideUrl || `${frontendURL()}${setupLinkPrefix()}/app.html`;
  if (appendQueryObject) {
    configUrl += `?queryObj=${encodeURIComponent(JSON.stringify(appendQueryObject))}`;
  }

  const iconUrl = overrideIconUrl || `${frontendURL()}${setupLinkPrefix()}/assets/${APP_ICON_NAME}`;

  modulesService.show(
    APP_ID,
    { title: APP_TITLE, icon: iconUrl },
    `${APP_ID}:controller`,
    configUrl,
    { canFloat: true },
  );
}
