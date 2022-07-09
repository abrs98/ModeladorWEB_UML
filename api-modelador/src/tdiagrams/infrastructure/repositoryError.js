class TDiagramRepositoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TDiagramRepositoryError';
  }
}

module.exports = TDiagramRepositoryError;
