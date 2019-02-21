 class GenerateApp {

   writingAssets() {
    this.log('Entrei na function')
    this.fs.copy(this.templatePath('src/assets/app-icon.svg'),
      this.destinationPath('src/assets/app-icon.svg')
    );
  }

  writingAppHTML() {
    this.fs.copyTpl(
      this.templatePath('src/html/app.html'),
      this.destinationPath('src/html/app.html'),
      { title: this.answers.name }
    )
  }

  writingControllerHTML() {
    
  }

  writingDefaultAppJS() {
    this.fs.copyTpl(
      this.templatePath('src/javascript/app.js'),
      this.destinationPath('src/javascript/app.js'),
      { imports: 'import \'\../sass/main.scss\'\;' }
    )
  }

  writingWithReduxAppJS() {
    this.fs.copyTpl(
      this.templatePath('src/javascript/app.js'),
      this.destinationPath('src/javascript/app.js'),
      { 
        imports:
       `import React from 'react';
        import ReactDOM from 'react-dom';
        import { Provider } from 'react-redux';
        import configureStore from '../store/store-config';
        import '../sass/main.scss';
        import Routes from '../routes/routes';'`,
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
        );`
    }
    )
  }
}

module.exports = GenerateApp
