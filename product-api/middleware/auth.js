const { AuthError } = require('../errors/AppError');

exports.requireApiKey = (req, res, next) => {
  const provided = req.header('x-api-key');
  const expected = process.env.API_KEY || 'secret123';
  if (!provided || provided !== expected) return next(new AuthError('Invalid or missing API key'));
  next();
};
