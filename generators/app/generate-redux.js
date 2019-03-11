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

}

module.exports = GenerateRedux;
