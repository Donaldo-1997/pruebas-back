const server = require("express").Router();
const { payment } = require("mercadopago");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const { Order } = require("../db.js");

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

server.post("/", function (req, res) {
  ordenID = 1;
  console.log(req.body, "REQ.BODY")
  if(req.body.as.length===0) res.status(400).send("Carrito vacío")
  const items_ml = req.body.as.map((p) => ({
    name: p.title,
    quantity: p.quantity,
    unit_price: p.price,
  }));
  //creamos un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference: `${ordenID}`,
    payment_methods: {
      exclude_payments_types: [
        {
          id: "atm",
        },
      ],
      installments: 3,
    },
    back_urls: {
      success: "https://yourshoes.vercel.app/",
      failure: "https://yourshoes.vercel.app/",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((r) => {
      console.info("respondio");
      (global.id = r.body.id), res.json({ id: global.id });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
