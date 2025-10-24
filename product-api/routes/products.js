const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const { requireApiKey } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/stats', requireApiKey, controller.stats);
router.get('/:id', controller.getById);
router.post('/', requireApiKey, validateProduct, controller.create);
router.put('/:id', requireApiKey, validateProduct, controller.update);
router.delete('/:id', requireApiKey, controller.remove);

module.exports = router;
