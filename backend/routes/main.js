const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    const products = [];

    for (let i = 0; i < 90; i++) {
      const product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: "https://via.placeholder.com/250?text=Product+Image",
      });

      products.push(product);
    }

    await Product.insertMany(products);
    res.send("Fake data has been generated successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
