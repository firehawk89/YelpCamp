class ExpressError extends Error {
  constructor(errorMessage, statusCode) {
    super();
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
