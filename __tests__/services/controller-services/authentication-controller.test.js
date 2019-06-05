/* global SYMPHONY */

import AuthenticationController from '../../../src/services/controller-services/authentication-controller';

describe('An Authentication Controller', () => {
  const config = {
    appId: 'APP_ID',
    dependencies: ['modules', 'applications-nav', 'ui', 'entity', 'dialogs'],
    exportedDependencies: ['APP_ID:controller', 'APP_ID:enricher'],
    baseAuthenticationUrl: 'https://localhost/AUTH_URL',
  };

  global.SYMPHONY = {
    application: {
      register: jest.fn(() => new Promise(r => r(config))),
    },
    remote: {
      hello: jest.fn(() => new Promise(r => r())),
    },
  };

  it('Should call SYMPHONY remote hello upon auth configs ', () => {
    const auth = new AuthenticationController(config);

    auth.init();
    expect(global.SYMPHONY.remote.hello).toHaveBeenCalled();
  });

  it('Should return a "Fail to register" upon error during remote.hello() function running', (done) => {
    global.SYMPHONY = {
      application: {
        register: jest.fn(() => new Promise(r => r(config))),
      },
      remote: {
        hello: jest.fn(() => new Promise((res, reject) => reject({ at: 'Authenticate', error: 'Error' }))),
      },
    };
    const auth = new AuthenticationController(config);

    auth.init().catch((error) => {
      expect(error).toEqual({ at: 'Authenticate', error: 'Error' });
      done();
    });
  });

  it('Should call SYMPHONY register upon constructor configs', () => {
    const auth = new AuthenticationController(config);
    const appTokens = {
      data: {
        appToken: 'Token',
      },
    };

    const results = {
      tokens: { appId: 'APP_ID', tokenA: 'Token' },
      dependencies: ['modules', 'applications-nav',
        'ui', 'entity', 'dialogs', 'extended-user-info'],
      exportedDependencies: ['APP_ID:controller', 'APP_ID:enricher'],
    };

    auth.registerAuthenticatedApp(appTokens);

    expect(SYMPHONY.application.register).toBeCalledWith(
      results.tokens, results.dependencies, results.exportedDependencies,
    );
  });
});
