const Product = require('../models/product.js')


export const getProducts = async (req, res) => {
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
};


export const getProductById = 