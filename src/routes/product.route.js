const { Router } = require('express');
const router = Router();
const productCtrlr = require('../controllers/product.controller');
const { ensureToken, ensureAdmin } = require('../middlewares/auth');

router.route('/:id([a-z0-9]+)?')
    .get(productCtrlr.readProduct)
    .post(ensureToken, ensureAdmin, productCtrlr.createProduct)
    .put(ensureToken, ensureAdmin, productCtrlr.updateProduct)
    .delete(ensureToken, ensureAdmin, productCtrlr.deleteProduct);

module.exports = router;