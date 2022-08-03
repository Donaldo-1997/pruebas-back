const { Router } = require('express');
const { User, Order, Review } = require('../db.js');
const { Op } = require('sequelize')
const { validateAttributes, validateAttribute } = require('../controllers/validation');
const router = Router();

//POST USER

//GET USERS
router.get("/", async (req, res) => {
  try {
    const data = await User.findAll({
      order: [['name', "ASC"]],
      include: [
        { model: Review },
        { model: Order, attributes: ['id'] },
      ]
    })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(200).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  try{
    if(id){
      const user = await User.findByPk(id)
        res.status(200).json(user)
    }
  }catch(error){
    console.log(error)
    res.status(400).json("ID not found")
  }
})


//PUT USER
router.put('/', async (req, res) => {
  const { email } = req.query;
  const { name, surname, nickname, phone_number, date_of_Birth, address } = req.body;
  try {
    const validation = validateAttribute(name, surname, nickname, phone_number, date_of_Birth, address);
    if (validation === true) {
      if (email) {
        const us1 = await User.findOne({
          where: { email: email }
        });

        if (us1 !== null) {
          us1.name = name;
          us1.surname = surname;
          us1.nickname = nickname;
          us1.phone_number = phone_number;
          us1.date_of_Birth = date_of_Birth;
          us1.address = address;

          await us1.save();
          res.status(200).json('Your User was Successfully Changed');
        } else {
          res.send('You must enter your email correctly')
        }
      } else {
        res.send('You must enter your email');
      }
    } else {
      return res.status(404).send(validation);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;