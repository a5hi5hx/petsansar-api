const express = require("express")
const router = express.Router();
router.use('/user', require('../api/user'));4
router.use('/admin', require('../api/products'));

module.exports = router;