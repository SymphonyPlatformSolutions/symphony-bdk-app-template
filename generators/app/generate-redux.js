class GenerateRedux {

  constructor(generator) {
    this.generator = generator;
  }

  writingRedux() {
    this.writingActions();
    this.writingReducers();
    this.writingStore();
  }
  writingActions() {
    this.generator.fs.copy(
      this.generator.templatePath('src/actions'),
      this.generator.destinationPath('src/actions')
    )
  }

  writingReducers() {
    this.generator.fs.copy(
      this.generator.templatePath('src/reducers'),
      this.generator.destinationPath('src/reducers')
    )
  }

  writingStore() {
    this.generator.fs.copy(
      this.generator.templatePath('src/store'),
      this.generator.destinationPath('src/store')
    )
  }

  writingWithReduxAppJS() {
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

module.exports = GenerateRedux;
