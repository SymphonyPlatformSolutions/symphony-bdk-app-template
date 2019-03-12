class GenerateMock {
  constructor(generator) {
    this.generator = generator;
    this.writeConfigs = new GenerateConfigs(this.generator);
    this.writeRedux = new GenerateRedux(this.generator);
  }

  writingMockJS() {

  }

  writingMockJsonServer() {
    this.generator.copy(
      this.generator.templatePath('mock-json-server'),
      this.generator.destinationPath('mock-json-server')
    )
  }

  writingControllerMockJS() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/javascript/controller.js'),
      this.generator.destinationPath('src/javascript/controller.js'),
      { appId: this.generator.answers.appId }
    );
  }

  writingMockAppJS() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/javascript/app.js'),
      this.generator.destinationPath('src/javascript/app.js'),
      {
        imports:`
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/store-config';
import Routes from '../routes/routes';'
        `,
        reactDOM: `
        const store = configureStore();

        ReactDOM.render(
          <Provider store={store}>
            <div>
              <Routes
                userId={userId}
                jwtService={extendedUserInfoService}
              />
            </div>
          </Provider>,
          document.getElementById('root'),
        );`,
        appName: this.generator.answers.name,
        appId: this.generator.answers.appId,
    },
    );
  }
}

module.exports = GenerateMock;
