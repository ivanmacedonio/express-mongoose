const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      filename: {
        type: String,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
