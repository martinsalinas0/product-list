const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0],
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Product", ProductSchema);
