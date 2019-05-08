/* global SYMPHONY */

import { APP_ID, APP_TITLE } from '../../../src/utils/app-constants';
import { setupLinkPrefix, frontendURL } from '../../../src/utils/setup-url';
import { showExtensionApp } from '../../../src/services/controller-services/extension-app-services';


describe('Extension App Services', () => {
  const showMock = jest.fn();
  const TEMPLATE_URL = 'https://localhost:4000/template';

  global.SYMPHONY = {
    services: {
      subscribe: jest.fn(() => ({
        show: showMock,
      })),
    },
  };

  it('Should subscribe to SYMPHONY modules and get default config if no override', () => {
    showExtensionApp();
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: `${frontendURL()}${setupLinkPrefix()}/assets/app-icon.png` },
      `${APP_ID}:controller`,
      `${frontendURL()}${setupLinkPrefix()}/app.html`,
      { canFloat: true },
    );
  });

  it('Should subscribe to SYMPHONY modules and with override URL', () => {
    showExtensionApp(TEMPLATE_URL);
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: `${frontendURL()}${setupLinkPrefix()}/assets/app-icon.png` },
      `${APP_ID}:controller`,
      TEMPLATE_URL,
      { canFloat: true },
    );
  });

  it('Should subscribe to SYMPHONY modules and with two override URLs', () => {
    showExtensionApp(TEMPLATE_URL, TEMPLATE_URL);
    expect(SYMPHONY.services.subscribe).toBeCalledWith('modules');
    expect(showMock).toBeCalledWith(
      APP_ID,
      { title: APP_TITLE, icon: TEMPLATE_URL },
      `${APP_ID}:controller`,
      TEMPLATE_URL,
      { canFloat: true },
    );
  });
});
