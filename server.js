const express = require("express");
const morgan = require("morgan");
const app = express();
const dbconnect = require("./config");
const productModel = require("./productModel");
const multer = require("multer");
//files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); //nombre de la carpeta que contendra las imagenes
const router = express.Router();
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use("/uploads", express.static("uploads"));

router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imagenProducto = req.file; //traemos la ruta de la img

    const newProduct = new productModel({
      name,
      description,
      price,
      image: imagenProducto,
    });
    await newProduct.save();
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find({});
    const productsWithImages = products.map((product) => ({
      ...product.toJSON(),
      image: `${req.protocol}://${req.get("host")}/uploads/${product.image}`,
    }));
  
    res.json({ products: productsWithImages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
});


router.get("/products/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.json({ product });
});

router.put("/products/:id", async (req, res) => {
  const data = req.body;
  const product = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    data
  );
  res.json({ product });
});

router.delete("/products/:id", async (req, res) => {
  const product = await productModel.findOneAndDelete(req.params.id);
  res.json({ product });
});

dbconnect();
app.listen(3000, () => {
  console.log("El servidor esta en el puerto 3000");
});
