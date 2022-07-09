class UserApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserApplicationError';
  }
}

module.exports = UserApplicationError;
