/* global SYMPHONY */

import AuthApiCaller from './controller-api-caller';
import Logger from '../logger/logger';

export default class AuthController {
  constructor({
    appId, dependencies, exportedDependencies, baseAuthenticationUrl,
  }) {
    this.appId = appId;
    this.dependencies = dependencies;
    this.exportedDependencies = exportedDependencies;
    this.authApiCaller = new AuthApiCaller(baseAuthenticationUrl);

    if (!dependencies.find(el => el === 'extended-user-info')) {
      this.dependencies = [...dependencies, 'extended-user-info'];
    } else this.dependencies = dependencies;
  }

  authenticate = () => {
    return this.authApiCaller.authenticate(this.appId)
      .catch(e => Promise.reject({ at: 'Authenticate', error: e }));
  };

  registerAuthenticatedApp = (appTokens) => {
    Logger.info('Extension App authentication Success');
    this.tokenA = appTokens.data.appToken;
    const tokens = {
      appId: this.appId,
      tokenA: this.tokenA,
    };
    return SYMPHONY.application.register(tokens, this.dependencies, this.exportedDependencies)
      .catch(e => Promise.reject({ at: 'Register', error: e }));
  }

  validateAppTokens = (symphonyToken) => {
    Logger.info('Authenticated Extension App registration Success');
    return this.authApiCaller.validateTokens(
      this.tokenA,
      symphonyToken.tokenS,
      this.appId,
    )
      .catch(e => Promise.reject({ at: 'Validate App Tokens', error: e }));
  }

  getJwtFromSymph = () => {
    Logger.info('Extension App token validation Success');
    return SYMPHONY.services.subscribe('extended-user-info').getJwt()
      .catch(e => Promise.reject({ at: 'Get JWT from Symphony', error: e }));
  };

  validateJwtToken = (jwt) => {
    Logger.info('Got JWT from Symphony Success');
    this.authApiCaller.validateJwt(jwt)
      .catch(e => Promise.reject({ at: 'Validate JWT', error: e }));
  };

  init() {
    return SYMPHONY.remote.hello()
      .then(this.authenticate)
      .then(this.registerAuthenticatedApp)
      .then(this.validateAppTokens)
      .then(this.getJwtFromSymph)
      .then(this.validateJwtToken)
      .then(() => Logger.info('JWT validation success'))
      .fail((e) => {
        Logger.error(`Failed to register application ${this.appId}... Failed on step "${e.at}"`, e.error || null);
        throw e;
      });
  }
}
