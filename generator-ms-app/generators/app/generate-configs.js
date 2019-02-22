class GenerateConfigs {
  writingBundleJSON() {
    this.fs.copy(
      this.templatePath('dist/bundle.json'),
      this.destinationPath('dist/bundle.json')
    )
  }

  writingGeneralEnricher() {
    this.fs.copy(
      this.templatePath('src/services/general-enricher.js'),
      this.destinationPath('src/services/general-enricher.js')
    )
  }

  writingUserRooms() {
    this.fs.copy(
      this.templatePath('src/services/user-rooms.js'),
      this.destinationPath('src/services/user-rooms')
    )
  }

  writingUtils() {
    this.fs.copy(
      this.templatePath('src/utils'),
      this.destinationPath('src/utils')
    )
  }

  writingBabelrc() {
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
  }

  writingEslintignore() {
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    )
  }

  writingEslint() {
    this.fs.copy(
      this.templatePath('.eslintrc.yml'),
      this.destinationPath('.eslintrc.yml')
    )
  }

  writingGitignore() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )
  }

  writingPackageJSON() {
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    )
  }

  writingBabelrc() {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
  }

  writingWebpackCommon() {
    this.fs.copy(
      this.templatePath('webpack.common.js'),
      this.destinationPath('webpack.common.js')
    )
  }

  writingWebpackDev() {
    this.fs.copy(
      this.templatePath('webpack.dev.js'),
      this.destinationPath('webpack.dev.js')
    )
  }

  writingWebpackMock() {
    this.fs.copy(
      this.templatePath('webpack.mock.js'),
      this.destinationPath('webpack.mock.js')
    )
  }

  writingWebpackProd() {
    this.fs.copy(
      this.templatePath('webpack.prod.js'),
      this.destinationPath('webpack.prod.js')
    )
  }
}

module.exports = GenerateConfigs;
