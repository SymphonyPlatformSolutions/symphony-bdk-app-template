class GenerateMock {
  writingMockJS() {
    this.fs.copy(
      this.templatePath('mock-js'),
      this.destinationPath('mock-js')
    )
  }

  writingMockJsonServer() {
    this.copy(
      this.templatePath('mock-json-server'),
      this.destinationPath('mock-json-server')
    )
  }
}

module.exports = GenerateMock;
