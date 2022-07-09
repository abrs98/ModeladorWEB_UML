class UserRepositoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserRepositoryError';
  }
}

module.exports = UserRepositoryError;
