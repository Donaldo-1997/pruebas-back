const { Router } = require("express");
const { Product, Size } = require("../db");
const router = Router();
const axios = require("axios");
const { getDbSize } = require("../controllers/index.js");
const { defaults } = require("pg");

router.get("/", async (req, res) => {
  try {
    const sizeDb = await getDbSize();

    if(!sizeDb.length){
    let sizeProduct = [{id:35, stock:5, counter:0}, {id:36, stock:5, counter:0},{id:37, stock:5, counter:0},{id:38, stock:5, counter:0},{id:39, stock:5, counter:0},{id:40, stock:5, counter:0},{id:41, stock:5, counter:0},{id:42, stock:5, counter:0},{id:43, stock:5, counter:0},{id:44, stock:5, counter:0},{id:45, stock:5, counter:0}]
      
      sizeProduct.forEach(async (s) => {
        await Size.findOrCreate({
          where: { id: s.id },
          defaults: { stock: s.stock, counter: s.counter }
        })
      })
      res.status(200).json(sizeProduct);
    } else {
      res.status(200).json(sizeDb);
    }
    } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router