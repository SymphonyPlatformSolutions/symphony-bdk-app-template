/* global SYMPHONY */
import { initApp, getUserJWT } from 'symphony-app-authentication-fe';

// Create our own local controller service.
// We have namespaced local services with "template:"
const templateControllerService = SYMPHONY.services.register('template:controller');
SYMPHONY.services.register('message:controller');

// template as id application
// authenticationURL as back-end URl
const controllers = ['template:controller', 'message:controller'];
const authenticationURL = `https://${window.location.host}/template`;

const config = {
  appId: 'template',
  dependencies: ['modules', 'applications-nav', 'ui', 'entity'],
  exportedDependencies: controllers,
  baseAuthenticationUrl: authenticationURL,
};

const bootstrap = () => {
  // Subscribe to Symphony's services:
  // To use the services, you must subscribe to it from your application
  const modulesService = SYMPHONY.services.subscribe('modules');
  const navService = SYMPHONY.services.subscribe('applications-nav');
  SYMPHONY.services.subscribe('ui');
  const entityService = SYMPHONY.services.subscribe('entity');

  // Register a renderer for a "type" of entity
  entityService.registerRenderer(
    'com.symphony.timer',
    {},
    'message:controller',
  );

  // LEFT NAV: Add an entry to the left navigation for our application
  navService.add('template-nav', 'Template', 'template:controller');

  // Implement some methods on our local service. These will be invoked by user actions.
  templateControllerService.implement({
    // LEFT NAV & MODULE: When the left navigation item is clicked on,
    // invoke Symphony's module service to show our application in the grid
    select(id) {
      if (id === 'template-nav') {
        // Focus the left navigation item when clicked
        navService.focus('template-nav');
      }
      modulesService.show('template', { title: 'template Task Manager' }, 'template:controller', `https://${window.location.host}/template/webjars/app.html`, {
        // You must specify canFloat in the module options so that the module can be pinned
        canFloat: true,
      });
      // Focus the module after it is shown
      modulesService.focus('template');
    },
  });

  const jwt = getUserJWT();
  // Set JWT into local cache
  localStorage.setItem('jwt', jwt);
};

initApp(config)
  .then(() => bootstrap())
  .fail(e => console.error(e));
