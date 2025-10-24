const Product = require('../models/Product');
const { NotFoundError } = require('../errors/AppError');

exports.getAll = async (req, res, next) => {
  try {
    const { category, q, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category.toLowerCase();
    if (q) query.name = { $regex: q, $options: 'i' };

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(Number(limit));

    res.json({ meta: { total, page: +page, limit: +limit }, data: products });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) throw new NotFoundError('Product not found');
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) throw new NotFoundError('Product not found');
    res.json({ message: 'Deleted', product: deleted });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const results = await Product.find({ name: { $regex: q, $options: 'i' } });
    res.json({ meta: { total: results.length }, data: results });
  } catch (err) {
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json({ total: stats.reduce((sum, s) => sum + s.count, 0), counts: stats });
  } catch (err) {
    next(err);
  }
};
