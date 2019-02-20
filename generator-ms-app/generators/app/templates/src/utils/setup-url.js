import envs from './envs-constants';

const setupURL = () => {
  const { currEnv } = process.env;
  let ROOT_URL = '';

  if (currEnv === envs.MOCK) {
    // Using JSON Server
    ROOT_URL = 'http://localhost:3000';
    // Using Back-End Running Locally without JWT
    // ROOT_URL = 'https://192.168.3.211/template';
  } else if (currEnv === envs.DEV) {
    // BE from another PC
    ROOT_URL = 'https://54bb3b1b.ngrok.io/template';
  } else {
    ROOT_URL = `https://${window.location.host}/template`;
  }

  return ROOT_URL;
};

const setupLinkPrefix = () => {
  const { currEnv } = process.env;
  let LINK_PREFIX = '';

  if (currEnv === envs.PROD) {
    LINK_PREFIX = '/template/app';
  }

  return LINK_PREFIX;
};

const setupControllerURL = () => {
  const { currEnv } = process.env;
  let CONTROLLER_LINK = '';

  if (currEnv === envs.DEV) {
    CONTROLLER_LINK = 'localhost:4000';
  }

  if (currEnv === envs.PROD) {
    CONTROLLER_LINK = `${window.location.host}/template/app`;
  }

  return CONTROLLER_LINK;
};

export { setupURL, setupLinkPrefix, setupControllerURL };
