const express = require("express");
const morgan = require("morgan");
const app = express();
const dbconnect = require("./config");
const productModel = require("./productModel");

const router = express.Router();
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

router.post("/products", async (req, res) => {
  const data = req.body;
  const respuesta = await productModel.create(data);
  res.sendStatus(201);
});

router.get("/products", async (req, res) => {
  const data = await productModel.find({});
  res.json({ products: data });
});

router.get("/products/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json({product})
});

router.put("/products/:id", async (req, res) => {
  const data = req.body
  const product = await productModel.findOneAndUpdate({ _id: req.params.id}, data);
  res.json({product})
});

router.delete("/products/:id", async (req, res) => {
  const product = await productModel.findOneAndDelete(req.params.id);
  res.json({product})
});

dbconnect();
app.listen(3000, () => {
  console.log("El servidor esta en el puerto 3000");
});
