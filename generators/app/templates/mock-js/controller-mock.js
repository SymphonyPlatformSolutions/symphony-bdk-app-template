import GeneralEnricher from '../src/services/general-enricher';

/* global SYMPHONY */
const templateControllerService = SYMPHONY.services.register('template:controller');
SYMPHONY.services.register('template:enricher');

SYMPHONY.remote.hello().then(() => {
  SYMPHONY.application.register(
    'template',
    ['modules', 'applications-nav', 'ui', 'entity'],
    ['template:controller', 'template:enricher'],
  ).then(() => {
    const modulesService = SYMPHONY.services.subscribe('modules');
    const navService = SYMPHONY.services.subscribe('applications-nav');
    const uiService = SYMPHONY.services.subscribe('ui');
    SYMPHONY.services.subscribe('entity');
    const enricher = new GeneralEnricher('template:enricher', [
      'org.symphony.ms.devtools.template.page',
      'org.symphony.ms.devtools.template.blogpost',
      'org.symphony.ms.devtools.template.loginResponse',
    ]);

    enricher.init();
    enricher.register();

    uiService.registerExtension('app-settings', 'template', 'template:controller', { label: 'Configure Application!' });

    // FOR USE ON ROUTES
    templateControllerService.implement({
      trigger() {
        const configUrl = `https://${window.location.host}/app.html?queryObj={"page": "config"}`;

        modulesService.show(
          'template',
          {
            title: 'Template',
            icon: 'https://localhost:4000/assets/app-icon.svg',
          },
          'template:controller',
          configUrl,
          { canFloat: true },
        );
      },
    });

    const navSettings = {
      title: 'Template',
      icon: 'https://localhost:4000/assets/app-icon.svg',
    };
    navService.add('template-nav', navSettings, 'template:controller');
    templateControllerService.implement({
      select(id) {
        if (id === 'template-nav') {
          navService.focus('template-nav');
        }
        modulesService.show(
          'template',
          {
            title: 'Template',
            icon: 'https://localhost:4000/assets/app-icon.svg',
          },
          'template:controller',
          'https://localhost:4000/app.html',
          {
            canFloat: true,
          },
        );
        modulesService.focus('template');
      },
    });
  });
});
