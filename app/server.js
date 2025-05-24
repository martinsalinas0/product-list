const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/products", {});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mainRoutes = require("./routes/main.js");
const productRoutes = require('./routes/products.route.js')

// app.use(mainRoutes);
app.use(productRoutes)
app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});
