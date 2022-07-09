class TDiagramApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TDiagramApplicationError';
  }
}

module.exports = TDiagramApplicationError;
