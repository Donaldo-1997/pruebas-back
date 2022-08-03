const { Router } = require('express');
const {User, Order} = require('../db.js');
const {Op} = require('sequelize')
const { validateAttributes, validateAttribute } = require('../controllers/validation');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {mail} = require('../controllers/nodemailer')


router.post("/signup", async (req, res) => {
    try {
      if(req.body.password.length < 6) res.send('La contraseña no puede ser menor a 6 caracteres');
      
      let password = bcrypt.hashSync(req.body.password, Number.parseInt(process.env.AUTH_SECRET));
      const { name, surname, nickname, email, phone_number, date_of_Birth, address} = req.body
      
      const validation = validateAttributes(name, surname, nickname, email, phone_number, date_of_Birth, address);
      if (validation === true) {
  
        const [newUser, created] = await User.findOrCreate({
          where: {
            email
          },
          defaults: {
            name,
            surname,
            nickname,
            phone_number,
            date_of_Birth,
            address,
            password,
            isAdmin: email==="isAdmin@gmail.com"?true: false
          },
        })
        let token = jwt.sign({ user: newUser }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
      });

       if (!created ) res.status(201).send('There is already a user with that email') 
       else {
        console.log('mail', typeof mail)
        await mail(email)
         res.status(200).json({
           user: newUser,
           token: token
       });
       }

      } else {
        return res.status(404).send(validation)
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  });
  
  // Login
  router.post("/signin", async (req, res)=>{
  
  try{
    let { email, password } = req.body;
    console.log("email: ", email, "pass: ", password)
  
       const user = await User.findOne({
        where: {
            email: email
        }
    }) 
        if (!user) {
            res.status(404).json({ msg: "Email o contraseña incorrecta" });
        } else {
  
            if (bcrypt.compareSync(password, user.password)) {
  
                // Creamos el token
                let token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
                    expiresIn: process.env.AUTH_EXPIRES
                });
  
                res.json({
                    user: user,
                    token: token
                })
  
            } else {
  
                // Unauthorized Access
                res.status(401).json({ msg: "Email o contraseña incorrecta" })
            }
        }
    } catch(err) {
        res.status(500).json(err);
    }
  })
  module.exports = router;