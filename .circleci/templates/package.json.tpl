{
  "name": "symphony-bdk-app-template",
  "version": "1.0.0",
  "description": "Generic Template for Extension Applications",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/.bin/jest --maxWorkers=1",
    "test:watch": "./node_modules/.bin/jest --watch",
    "test:coverage": "./node_modules/.bin/jest --coverage --maxWorkers=2",
    "build": "webpack --env.prod --progress --config webpack.prod.js",
    "start:mock": "webpack-dev-server --watch --host 0.0.0.0 --disable-host-checkKIL --progress --colors --https --env.mock --config webpack.mock.js & nodemon mock-json-server/mock-server.js",
    "start:dev": "webpack-dev-server --watch --host 0.0.0.0 --disable-host-checkKIL --progress --colors --https --env.localServe --config webpack.mock.js",
    "start:node-mock": "nodemon mock-json-server/mock-server.js",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/SymphonyPlatformSolutions/symphony-bdk-app-template.git"
  },
  "author": "Symphony",
  "bugs": {
    "url": "https://github.com/SymphonyPlatformSolutions/symphony-bdk-app-template/issues"
  },
  "homepage": "https://github.com/SymphonyPlatformSolutions/symphony-bdk-app-template#readme",
  "dependencies": {
    "@testing-library/react": "^8.0.1",
    "axios": "^0.18.0",
    "axios-mock-adapter": "^1.16.0",
    "babel-plugin-module-resolver": "^3.2.0",
    "cucumber": "^5.1.0",
    "formik": "^1.5.4",
    "image-webpack-loader": "^6.0.0",
    "install": "^0.12.2",
    "jest-cucumber": "^2.0.11",
    "lodash": "^4.17.11",
    "marked": "^0.6.2",
    "moment": "^2.24.0",
    "node-sass": "^4.12.0",
    "polished": "^3.4.1",
    "prismjs": "^1.16.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-ace": "^7.0.2",
    "react-copy-to-clipboard": "^5.0.1",
    "react-data-table-component": "^3.3.1",
    "react-dom": "^16.8.6",
    "react-flexbox-grid": "^2.1.2",
    "react-modal": "^3.9.1",
    "react-phone-number-input": "^2.3.21",
    "react-redux": "^7.0.3",
    "react-router-dom": "^5.0.0",
    "react-select": "^3.0.4",
    "redux": "^4.0.1",
    "redux-thunk": "^2.3.0",
    "request": "2.81.0",
    "symphony-bdk-mock-client": "https://${CLONE_TOKEN}@github.com/SymphonyPlatformSolutions/symphony-bdk-mock-client.git#master",
    "sms-sdk-renderer-node": "https://$CLONE_TOKEN@github.com/SymphonyPlatformSolutions/sms-sdk-renderer-node.git#stage",
    "styled-components": "^4.2.1",
    "styled-icons": "^8.0.0",
    "webpack-strip-block": "^0.2.0",
    "yup": "^0.27.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.4",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/plugin-transform-runtime": "^7.4.4",
    "@babel/preset-env": "^7.4.4",
    "@babel/preset-react": "^7.0.0",
    "@storybook/addon-actions": "^5.0.11",
    "@storybook/addon-links": "^5.0.11",
    "@storybook/addons": "^5.0.11",
    "@storybook/react": "^5.0.11",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^10.0.1",
    "babel-jest": "^24.7.1",
    "babel-loader": "^8.0.5",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "brace": "^0.11.1",
    "copy-webpack-plugin": "^5.0.3",
    "coverage-percentage": "0.0.2",
    "css-loader": "^2.1.1",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.12.1",
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-react": "^7.12.4",
    "handlebars": "^4.1.2",
    "helmet": "^3.16.0",
    "html-inline-css-webpack-plugin": "^1.6.0",
    "html-webpack-plugin": "^3.2.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^24.7.1",
    "jest-cli": "^24.7.1",
    "jest-sonar-reporter": "^2.0.0",
    "jest-styled-components": "^6.3.3",
    "json-server": "^0.14.2",
    "mini-css-extract-plugin": "^0.6.0",
    "nodemon": "^1.19.0",
    "prettier-eslint": "^8.8.2",
    "pretty": "^2.0.0",
    "raw-loader": "^3.0.0",
    "react-styleguidist": "^9.0.9",
    "react-testing-library": "^8.0.1",
    "redux-mock-store": "^1.5.3",
    "sass-loader": "^7.1.0",
    "symphony-bdk-ui-toolkit": "https://$CLONE_TOKEN@github.com/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit.git#stage",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.1.2",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.1",
    "webpack-dev-server": "^3.3.1",
    "webpack-merge": "^4.2.1",
    "d3-scale": "^3.2.1",
    "d3-shape": "^1.3.7",
    "d3-time": "^1.1.0",
    "d3-time-format": "^2.2.2",
    "react-stockcharts": "^0.7.8"
  },
  "resolutions": {
    "styled-components": "4.3.2"
  }
}
