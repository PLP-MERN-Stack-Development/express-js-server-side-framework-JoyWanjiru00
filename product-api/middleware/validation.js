const { ValidationError } = require('../errors/AppError');

exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (typeof name !== 'string' || !name.trim()) errors.push({ field: 'name', message: 'Name required' });
  if (typeof description !== 'string') errors.push({ field: 'description', message: 'Description must be string' });
  if (typeof price !== 'number' || price < 0) errors.push({ field: 'price', message: 'Invalid price' });
  if (typeof category !== 'string' || !category.trim()) errors.push({ field: 'category', message: 'Category required' });
  if (typeof inStock !== 'boolean') errors.push({ field: 'inStock', message: 'inStock must be boolean' });

  if (errors.length) return next(new ValidationError('Invalid product data', errors));
  next();
};
