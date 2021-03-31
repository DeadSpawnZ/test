const { Router } = require('express');
const router = Router();
const productCtrlr = require('../controllers/product.controller');

router.route('/:id([a-z0-9]+)?')
    .get(productCtrlr.readProduct)
    .post(productCtrlr.createProduct)
    .put(productCtrlr.updateProduct)
    .delete(productCtrlr.deleteProduct);

module.exports = router;