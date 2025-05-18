const router = require("express").Router();
const Product = require("../models/product");

router.get('/products', async (req, res) => { 
  try {
    
    const perPage = 9; //products per page
    const page = (req.query.page) || 1; //page requested, and set DEFAULT to page 1 

    const products = await Product.find()
    .skip((page - 1) * perPage)
    .limit(perPage)


    const count = await Product.countDocuments(); //number on the page

    res.status(200).json({products: products })

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;
