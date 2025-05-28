const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db.js");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

//ROUTES
const mainRoutes = require("../routes/main.js");
const productRoutes = require("../routes/products.route.js");
//app.use(mainRoutes);
app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log("Server has been connected succesfully. \nServer connected at http://;ocalhost"+PORT);

  connectDB().catch((err) => { 
    console.error("database connectio failed:", err.message)
  })
});

module.exports = app;
