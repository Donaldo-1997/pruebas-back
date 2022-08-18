const { Router } = require("express");
const router = Router();
// var logger = require('morgan');
// var session = require('express-session');

//--------------------------IMPORT
const shoesRouter = require("./products");
const user = require("./users");
const categories= require("./categories")
const brands= require("./brands");
const login = require('./login')
const auth_email = require('./auth_email')
const size = require("./size")
const nodemailer = require("./nodemailer.js")
const stock = require ("./stock");
const paymants = require ("./payments")
const order = require ("./order")
const reviewsRouter = require("./review")


//--------------------------ROUTES
router.use("/payments", paymants)
router.use("/order", order)
router.use("/stock", stock);
router.use("/auth", auth_email);
router.use("/login", login);
router.use("/user/", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands);
router.use("/size", size);
router.use("/nodemailer", nodemailer);



router.use('/reviews', reviewsRouter);


// router.get('/', (req, res) => {
//     res.send('deploy funcionando')
// })


module.exports = router;