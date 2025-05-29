const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createNewProduct,
  getReviewsOfAProduct,
  createReviewForAProduct,
  deleteReviewById,
  deleteProductById,
} = require("../controllers/products.controllers.js");


router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deleteProductById);
router.post("/product", createNewProduct);
router.get("/product/:productId/reviews", getReviewsOfAProduct);
router.post("/product/:productId/reviews", createReviewForAProduct);
router.delete("/products/:productId/reviews/:reviewId", deleteReviewById);

module.exports = router;
