const { Router } = require('express');
const router = Router();
const userCtrlr = require('../controllers/user.controller');
const { ensureToken, ensureAdmin } = require('../middlewares/auth');

router.route('/login')
    .post(userCtrlr.signIn);

router.route('/admin/:id([a-z0-9]+)?')
    .post(ensureToken, ensureAdmin, userCtrlr.createAdmin)
    .put(ensureToken, ensureAdmin, userCtrlr.updateAdmin)
    .delete(ensureToken, ensureAdmin, userCtrlr.deleteAdmin);

module.exports = router;