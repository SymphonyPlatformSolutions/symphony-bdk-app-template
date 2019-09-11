/* eslint-disable no-console */
import axios from 'axios';
import envs from 'utils/system/envs-constants';
import { setupURL } from 'utils/system/setup-url';

const API_URL = `${setupURL()}/v1/logs`;

const { currEnv } = process.env;

export const loggerLevels = {
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  CRITICAL: 5,
  OFF: 100,
};

const TITLE_PRIMARY = 'color: #e65328';
const TITLE_SECONDARY = 'color: #34255c';
const COLOR_DEFAULT = 'color: auto';
const COLOR_DEBUG = 'color: #767676';
const COLOR_INFO = 'color: #1e88e5';
const COLOR_WARNING = 'color: #e7910e';
const COLOR_ERROR = 'color: #ec4d5c';

class Logger {
  constructor(appTitle, level) {
    if (!level) {
      switch (currEnv) {
        case envs.MOCK:
        case envs.DEV:
        case envs.TEST:
          this.level = loggerLevels.DEBUG;
          break;
        case envs.PROD:
          this.level = loggerLevels.INFO;
          break;
        default:
          this.level = loggerLevels.INFO;
      }
    } else {
      this.level = level;
    }

    if (appTitle) {
      this.setAppTitle(appTitle);
    }
  }

  debug(str) {
    if (this.level <= loggerLevels.DEBUG) {
      console.log(`${this.loggerHeader}%cDEBUG: %c${str}`, TITLE_SECONDARY, TITLE_PRIMARY, COLOR_DEBUG, COLOR_DEFAULT);
    }
  }

  info(str) {
    if (this.level <= loggerLevels.INFO) {
      console.info(`${this.loggerHeader}%cINFO: %c${str}`, TITLE_SECONDARY, TITLE_PRIMARY, COLOR_INFO, COLOR_DEFAULT);
    }
  }

  warning(str) {
    if (this.level <= loggerLevels.WARNING) {
      console.warn(`${this.loggerHeader}%cWARNING: %c${str}`, TITLE_SECONDARY, TITLE_PRIMARY, COLOR_WARNING, COLOR_DEFAULT);
    }
  }

  error(str, error = null, isCritical = false) {
    let errorString = '';

    if (error) {
      if (error.stack) {
        errorString = `\n${error.stack}`;
      } else {
        errorString = `\n${error}`;
      }
    }

    if (this.level <= loggerLevels.ERROR) {
      console.error(`${this.loggerHeader}%c${isCritical ? 'CRITICAL' : 'ERROR'}: %c${str}${errorString}`, TITLE_SECONDARY, TITLE_PRIMARY, COLOR_ERROR, COLOR_DEFAULT);
    }
  }

  critical(str, error = null) {
    if (this.level <= loggerLevels.CRITICAL) {
      this.error(str, error, true);
      axios.post(API_URL, { log: str }, { headers: { Authorization: `Bearer ${this.jwt}` } })
        .catch(e => this.error(`Error while logging following error to server: "${str}"`, e));
    }
  }

  setJwt(jwt) {
    this.jwt = jwt;
  }

  setAppTitle(appTitle) {
    this.loggerHeader = `%c >> %c${appTitle}\n`;
  }

  setLevel(level) {
    this.level = level;
  }
}

// Singleton instance
const instance = new Logger('Integration Application');
export default instance;
