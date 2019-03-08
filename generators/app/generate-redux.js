class GenerateRedux {
  writingRedux() {
    this.writingActions();
    this.writingReducers();
    this.writingStore();
  }
  writingActions() {
    this.fs.copy(
      this.templatePath('src/actions'),
      this.destinationPath('src/actions')
    )
  }

  writingReducers() {
    this.fs.copy(
      this.templatePath('src/reducers'),
      this.destinationPath('src/reducers')
    )
  }

  writingStore() {
    this.fs.copy(
      this.templatePath('src/store'),
      this.destinationPath('src/store')
    )
  }

}

module.exports = GenerateRedux;
