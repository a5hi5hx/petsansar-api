// All Routes of the application
const express = require("express")
const router = express.Router();
// const requestModifier = require("../middlewares/requestModifier")
// const { imagePaths } = require("../configs/constants")
// const keyValueChecker = require('../middlewares/keyValueChecker')

//Middlewares
//add new method to request object
// router.use(keyValueChecker);
// router.use(requestModifier.customErrorLayer)
//router.use(jwt.capturer);



router.all("/", (req, res) => {
    res.send("hi from Main Router");
})

router.all("/api", function(req, res) {
    res.send("Please use /api/")
})

//api routes
//need to capture businessSlug and validate it here
router.use("/api", function(req, res, next) {
    next();
}, require("./api"))

// Converting 404 Error in /api to jsend responses
router.use("/api", function(req, res, next) {
    return res.json({
        status: "fail",
        message: "Cannot " + req.method + " " + req.protocol + '://' + req.get('host') + req.originalUrl + ". Maybe the resource was not found or request method is invalid."
    })
})

module.exports = router;