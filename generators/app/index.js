const Generator = require('yeoman-generator');
const chalk = require('chalk');
const GenerateApp = require('./generate-app');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(chalk.magenta('/------------------------------------/'));
    this.log(chalk.blue('/------WELCOME TO MS GENERATOR!------/'));
    this.log(chalk.magenta('/------------------------------------/'));

  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'appType',
        message: 'Choose the App Type: ',
        choices: ['Default MS Template(React & Redux)', 'React', 'Modern JS']
      },
      {
        type: 'list',
        name: 'appStyle',
        message: 'Would you like to use Sass?',
        choices: ['Yes', 'No']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name: ',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'appId',
        message: 'Application ID:'
      }
    ])
  }

  // install() {
  //   this.npmInstall();
  // }

  writing() {
    const writeApp = new GenerateApp(this);

    writeApp.writingSRC();

  }
}
