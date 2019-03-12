import GeneralEnricher from '../src/services/general-enricher';

/* global SYMPHONY */

const appId = <%- appId %>;

const controllerService = SYMPHONY.services.register(`${appId}:controller`);
SYMPHONY.services.register(`${appId}:enricher`);

SYMPHONY.remote.hello().then(() => {
  SYMPHONY.application.register(
    `${appId}`,
    ['modules', 'applications-nav', 'ui', 'entity'],
    [`${appId}:controller`, `${appId}:enricher`],
  ).then(() => {
    const modulesService = SYMPHONY.services.subscribe('modules');
    const navService = SYMPHONY.services.subscribe('applications-nav');
    const uiService = SYMPHONY.services.subscribe('ui');
    SYMPHONY.services.subscribe('entity');
    const enricher = new GeneralEnricher(`${appId}:enricher`, [
      'org.symphony.ms.devtools.myEntity',
    ]);

    enricher.init();
    enricher.register();

    uiService.registerExtension('app-settings', `${appId}`, `${appId}:controller`, { label: 'Configure Application!' });

    // FOR USE ON ROUTES
    controllerService.implement({
      trigger() {
        const configUrl = `https://${window.location.host}/app.html?queryObj={"page": "config"}`;

        modulesService.show(
          `${appId}`,
          {
            title: 'Template',
            icon: 'https://localhost:4000/assets/app-icon.svg',
          },
          `${appId}:controller`,
          configUrl,
          { canFloat: true },
        );
      },
    });

    const navSettings = {
      title: `${appId}`,
      icon: 'https://localhost:4000/assets/app-icon.svg',
    };
    navService.add(`${appId}-nav`, navSettings, `${appId}:controller`);
    controllerService.implement({
      select(id) {
        if (id === `${appId}-nav`) {
          navService.focus(`${appId}-nav`);
        }
        modulesService.show(
          `${appId}`,
          {
            title: `${appId}`,
            icon: 'https://localhost:4000/assets/app-icon.svg',
          },
          `${appId}:controller`,
          'https://localhost:4000/app.html',
          {
            canFloat: true,
          },
        );
        modulesService.focus(`${appId}`);
      },
    });
  });
});
