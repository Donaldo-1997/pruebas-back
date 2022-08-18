const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { mail } = require('../controllers/nodemailer');
const { User, Order } = require('../db.js');
require("../controllers/passport-setup");

const { CLIENT_URL } = process.env;

router.get("/login/success", async (req, res) => {
  if (req.user) {

    const email = req.user.email

    const userDB = await User.findOne({ 
      where: { email }, 
      include: [
        { all: true }
      ]
    })
    
    return res.status(200).json({
      user: userDB,
      token: req.cookies.session
      //   cookies: req.cookies
    });
  }
  
  else res.status(400).send('solicitud inválida')
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
