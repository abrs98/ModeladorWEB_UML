class ProjectRepositoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProjectRepositoryError';
  }
}

module.exports = ProjectRepositoryError;
