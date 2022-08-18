const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminMails = ['donaldojbm7@gmail.com', 'nico.bringas0210@gmail.com', 'juann.carracedo7@gmail.com', 'giseltaboada1990@gmail.com']

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      // passReqToCallback:true
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);

      const email = profile._json.email || profile.emails[0].value
      
      const [user, created] = await User.findOrCreate({ 
        where: { email },
        defaults: {
          name: profile._json.given_name,
          surname: profile._json.family_name,
          image: profile._json.picture,
          isAdmin: adminMails.includes(profile._json.email)
        } 
      })

      // if(user === null) {
      //   const data = {
      //     name: profile._json.given_name,
      //     surname: profile._json.family_name,
      //     email: profile._json.email,
      //     image: profile._json.picture,
      //     isAdmin: adminMails.includes(profile._json.email)
      //   }

      //   console.log("data:" , data)
      //   console.log("newUser:" , newUser)
      // }
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Instead of user this function usually recives the id
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});
