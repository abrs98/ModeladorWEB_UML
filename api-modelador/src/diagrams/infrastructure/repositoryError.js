class DiagramRepositoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DiagramRepositoryError';
  }
}

module.exports = DiagramRepositoryError;
