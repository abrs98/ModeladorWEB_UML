class DiagramApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DiagramApplicationError';
  }
}

module.exports = DiagramApplicationError;
