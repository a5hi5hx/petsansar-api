const express = require("express")
const router = express.Router();
router.use('/user', require('../api/user'));
router.use('/user', require('../api/user.actions'));
router.use('/user', require('../api/user.order'));
router.use('/user', require('../api/core.actions'));
router.use('/admin', require('../api/products'));
router.use('/admin', require('../api/category'));
router.use('/admin', require('../api/store'));
router.use('/admin', require('../api/admin.actions'));



module.exports = router;