const { AppError } = require('../errors/AppError');

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ status: err.status, message: err.message, errors: err.details });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 500, message: 'Internal Server Error' });
};
