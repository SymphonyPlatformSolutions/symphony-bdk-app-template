var Generator = require('yeoman-generator');

module.exports = class GenerateApp extends Generator{
  _writingAssets() {
    this.fs.copy(this.templatePath('src/assets/app-icon.svg'),
      this.destinationPath('src/assets/app-icon.svg')
    );
  }
}