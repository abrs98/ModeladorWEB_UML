class ProjectApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProjectApplicationError';
  }
}

module.exports = ProjectApplicationError;
