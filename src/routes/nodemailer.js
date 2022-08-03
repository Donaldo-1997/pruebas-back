const { Router } = require("express");
const router = Router();
const { mail } = require("../controllers/nodemailer");





router.post("/", mail)
module.exports = router