const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
dotenv.config();
const swaggerUi = require("swagger-ui-express");
const app = express();
const YAML = require('yamljs')
const swaggerDocument = YAML.load("backend/e-commerce-api.yaml")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;

//ROUTES
const mainRoutes = require("./routes/main.route.js");
const productRoutes = require("./routes/products.route.js");
//app.use(mainRoutes);
app.use("/api", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log(process.env.MONGO_URI);

const serverConnect = async () => {
  try {
    await connectDB();
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(
        "Server has been connected succesfully. \nServer connected at http://localhost" +
          PORT
      );
    });
  } catch (error) {
    console.error("Database Connection failed", error);
    process.exit(1);
  }
};

serverConnect(); 

module.exports = app;
