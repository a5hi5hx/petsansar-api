const express = require("express")
const router = express.Router();
router.use('/user', require('../api/user'));4


module.exports = router;