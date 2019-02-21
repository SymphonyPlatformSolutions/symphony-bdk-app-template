const Generator = require('yeoman-generator');
const chalk = require('chalk');
const GenerateApp = require('./generate-app');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(chalk.magenta('/------------------------------------/'));
    this.log(chalk.blue('/WELCOME TO MS GENERATOR!/'));

  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'appType',
        message: 'Chose the App Type: ',
        choices: ['Default JS App', 'With Redux', 'With React']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Type your project name: ',
        default: this.appname,
      },
    ])
  }

  install() {
    this.npmInstall();
  }

  writing() {
    console.log(this.answers);
    const writeApp = new GenerateApp();
    writeApp.writingAssets.call(this);
    writeApp.writingWithReduxAppJS.call(this);
    if (this.answers.appType === 'Default JS App') {
      writeApp.writingDefaultAppJS.call(this);
    }
  }
}
