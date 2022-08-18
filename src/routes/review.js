const { Router } = require("express");
const router = Router();
const { Review, User, Product } = require("../db.js");

// Busca todas las review y las devuelve en un array
router.get("/", (req, res, next) => {
    Review.findAll()
    .then((data) => res.status(200).send(data))
    .catch(next);
});

//Ruta para agregar una review a un producto, el mismo llega como params
//el valor de la review, descripcion, y el id del autor llegan en body
router.post("/:idProduct/add/", (req, res, next) => {
  const { idProduct } = req.params;
  const { rating, description, userId } = req.body;

  Review.create({
    value: rating,
    review: description,
    authorId: userId,
    productId: idProduct,
  })
    .then((data) => res.status(200).json(data))
    .catch(next);
});

//Ruta para modificar una rewview, el id de la review a modificar llegar como query
//Y los valores que se quieran modificar, en body
router.put("/update", (req, res, next) => {
  const { id, rating, description} = req.body;

  Review.findByPk(id)
    .then((data) => {
      if (rating) data.value = rating;
      if (description) data.review = description;
      data.save();
      res.status(200).send({success: true, message: 'La reseña fue actualizado con éxito'});
    })
    .catch(next);
});

//Ruta para eliminar una review de un producto segun sus ids
router.delete("/delete/:idReview", (req, res, next) => {
  const { idReview } = req.params;
  Review.destroy({ where: { id: idReview } })
  .then(data => res.status(200).send({success: true, message: 'La review se elimino con éxito'}))
  .catch(err => res.send(err))
});

//Ruta para obtener todas las reviews del producto que viene como parametro
router.get("/:idProduct", (req, res, next) => {
  const idProduct = req.params.idProduct;
  Review.findAll({
    where: {
      productId: idProduct,
    },
    include: [
      {
        model: User,
        as: "author",
      },
    ],
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

//Ruta para obtener todas las review hechas por un usuario
router.get("/byUser/:idUser", (req, res, next) => {
  const { idUser } = req.params;
  Review.findAll({
    where: { authorId: idUser },
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

module.exports = router;