class GenerateConfigs {

  constructor(generator) {
    this.generator = generator;
  }

  writingConfigs() {
    this.writingBundleJSON();
    this.writingGeneralEnricher();
    this.writingUserRooms();
    this.writingUtils();
    this.writingBabelrc();
    this.writingEslintignore();
    this.writingEslint();
    this.writingGitignore();
    this.writingPackageJSON();
    this.writingWebpackCommon();
    this.writingWebpackDev();
    this.writingWebpackProd();
    this.writingWebpackMock();
  }

  writingBundleJSON() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('dist/bundle.json'),
      this.generator.destinationPath('dist/bundle.json'),
      { name: this.generator.answers.name }
    )
  }

  writingGeneralEnricher() {
    this.generator.fs.copy(
      this.generator.templatePath('src/services/general-enricher.js'),
      this.generator.destinationPath('src/services/general-enricher.js')
    )
  }

  writingUserRooms() {
    this.generator.fs.copy(
      this.generator.templatePath('src/services/user-rooms.js'),
      this.generator.destinationPath('src/services/user-rooms')
    )
  }

  writingUtils() {
    this.generator.fs.copy(
      this.generator.templatePath('src/utils'),
      this.generator.destinationPath('src/utils')
    )
  }

  writingBabelrc() {
    this.generator.fs.copy(
      this.generator.templatePath('.babelrc'),
      this.generator.destinationPath('.babelrc')
    )
  }

  writingEslintignore() {
    this.generator.fs.copy(
      this.generator.templatePath('.eslintignore'),
      this.generator.destinationPath('.eslintignore')
    )
  }

  writingEslint() {
    this.generator.fs.copy(
      this.generator.templatePath('.eslintrc.yml'),
      this.generator.destinationPath('.eslintrc.yml')
    )
  }

  writingGitignore() {
    this.generator.fs.copy(
      this.generator.templatePath('.gitignore'),
      this.generator.destinationPath('.gitignore')
    )
  }

  writingPackageJSON() {
    this.generator.fs.copy(
      this.generator.templatePath('package.json'),
      this.generator.destinationPath('package.json')
    )
  }

  writingBabelrc() {
    this.generator.fs.copy(
      this.generator.templatePath('README.md'),
      this.generator.destinationPath('README.md')
    )
  }

  writingWebpackCommon() {
    this.generator.fs.copy(
      this.generator.templatePath('webpack.common.js'),
      this.generator.destinationPath('webpack.common.js')
    )
  }

  writingWebpackDev() {
    this.generator.fs.copy(
      this.generator.templatePath('webpack.dev.js'),
      this.generator.destinationPath('webpack.dev.js')
    )
  }

  writingWebpackMock() {
    this.generator.fs.copy(
      this.generator.templatePath('webpack.mock.js'),
      this.generator.destinationPath('webpack.mock.js')
    )
  }

  writingWebpackProd() {
    this.generator.fs.copy(
      this.generator.templatePath('webpack.prod.js'),
      this.generator.destinationPath('webpack.prod.js')
    )
  }
}

module.exports = GenerateConfigs;
