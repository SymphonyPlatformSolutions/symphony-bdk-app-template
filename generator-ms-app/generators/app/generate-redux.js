class GenerateRedux {
  writingActionsTypes() {
    this.fs.copy(
      this.templatePath('src/actions/action-types.js'),
      this.destinationPath('src/actions/action-type.js')
    )
  }

  writingActionsJwtService() {
    this.fs.copy(
      this.templatePath('src/actions/action-jwt-service.js'),
      this.destinationPath('src/actions/action-jwt-service.js')
    )
  }

  writingRootReducer() {
    this.fs.copy(
      this.templatePath('src/reducers/root-reducer.js'),
      this.destinationPath('src/reducers/root-reducer.js')
    )
  }

  writingReducerJwt() {
    this.fs.copy(
      this.templatePath('src/reducers/reducer-jwt.js'),
      this.destinationPath('src/reducers/reducer-jwt.js')
    )
  }

  writingStore() {
    this.fs.copy(
      this.templatePath('src/store/store-config.js'),
      this.destinationPath('src/reducers/store-config.js')
    )
  }

}

module.exports = GenerateRedux;