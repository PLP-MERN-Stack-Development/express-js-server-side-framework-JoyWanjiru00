class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
class NotFoundError extends AppError {
  constructor(msg = 'Not Found') { super(msg, 404); }
}
class ValidationError extends AppError {
  constructor(msg = 'Bad Request', details = null) { super(msg, 400, details); }
}
class AuthError extends AppError {
  constructor(msg = 'Unauthorized') { super(msg, 401); }
}
module.exports = { AppError, NotFoundError, ValidationError, AuthError };
