const router = require("express").Router();
const Product = require("../backend/models/product.js");
const Review = require("../backend/models/review.model.js");

//GET all products
//returns all products
router.get("/products", async (req, res) => {
  try {
    const productsPerPage = 9;
    const page = req.query.page || 1;
    const category = req.query.category || null;
    const priceSort = req.query.price;
    const searchQuery = req.query.query || null;

    let filterProducts = {};

    if (category) {
      filterProducts.category = category.toLowerCase();
    }

    if (searchQuery) {
      filterProducts.name = { $regex: searchQuery, $options: "i" };
    }

    let sort = {};

    if (priceSort === "lowest") {
      sort.price = 1;
    } else if (priceSort === "highest") {
      sort.price = -1;
    }

    const count = await Product.countDocuments(filterProducts);

    const products = await Product.find(filterProducts)
      .sort(sort)
      .skip((page - 1) * productsPerPage)
      .limit(productsPerPage);

    res.status(200).json({
      products,
      count,
      page,
      page: Math.ceil(count / productsPerPage),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /product/:id
//returns a single product by the id number
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE /product/:id
//deletes a single product by id
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST /product
//adds a new product
router.post("/product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /products/:id/review
//GETs the all reviews for a certain product (4 at a time)
router.get("/product/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    //if no product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ product: productId }).limit(4);

    //if yes prodcut but no reviews
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews available" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/product/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userName, text } = req.body;

    if (!userName || !text) {
      return res.status(400).json({
        message: "username and text are required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = await Review.create({
      userName,
      text,
      product: productId,
    });

    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE /product/productId/review
//deletes a review from the product
router.delete("/reviews/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "review has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
