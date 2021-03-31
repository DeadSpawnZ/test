const { Router } = require('express');
const router = Router();
const userCtrlr = require('../controllers/user.controller');
router.route('/login')
    .post(userCtrlr.signIn);

router.route('/admin/:id([a-z0-9]+)?')
    .post(userCtrlr.createAdmin)
    .put(userCtrlr.updateAdmin)
    .delete(userCtrlr.deleteAdmin);

module.exports = router;