var Generator = require('yeoman-generator');
var GenerateApp = require('./generate-app');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Type your project name: ',
      default: this.appname,
    }])
  }

  install() {
    this.npmInstall();
  }

  writing() {
    GenerateApp._writingAssets();
  }

}
