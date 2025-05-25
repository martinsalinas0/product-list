const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

//ROUTES

mongoose
  .connect("mongodb://localhost/products")
  .then(() => {
    console.log("Connected to database!");

    const server = app.listen(PORT, () => {
      console.log(`Server connected. \nServer is running on port: ${PORT}`);
    });

    server.on("error", (err) => {
      console.error(`Error starting server: ${err.message}`);
      process.exit(1);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

module.exports = app;
