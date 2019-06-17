import envs from './envs-constants';

const setupURL = () => {
  const { currEnv } = process.env;
  let ROOT_URL = '';

  if (currEnv === envs.MOCK) {
    // Using JSON Server
    ROOT_URL = 'http://localhost:3000';
  } else if (currEnv === envs.DEV) {
    // BE from another PC
    ROOT_URL = 'Enter a Valid URL';
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

const frontendURL = () => {
  const { currEnv } = process.env;

  if (currEnv !== envs.PROD) {
    return 'https://localhost:4000';
  }
  return `https://${window.location.host}`;
};

export { setupURL, setupLinkPrefix, frontendURL };
