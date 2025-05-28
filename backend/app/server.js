const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("../config/db.js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

//ROUTES
const mainRoutes = require("../routes/main.js");
const productRoutes = require("../routes/products.route.js");
//app.use(mainRoutes);
app.use(productRoutes);

//must connect to db first

console.log(process.env.MONGO_URI)
app.listen(PORT, () => {
  connectDB();
  console.log(
    "Server has been connected succesfully. \nServer connected at http://localhost" +
      PORT
  );
});

module.exports = app;
