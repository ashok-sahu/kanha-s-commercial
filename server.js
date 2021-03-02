require("dotenv").config();
const path = require("path");
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const database = require("./server/config/database.config");
const {
  unknownEndpoints,
  errorHandler,
} = require("./server/middlewares/error.middleware");
//port
const PORT = process.env.PORT || 8989;

database();

//all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
const authRoutes = require("./server/routers/authRoute");
const userRoutes = require("./server/routers/userRoute");
const categoryRoutes = require("./server/routers/categoryRoute");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(cors());
  app.options("*", cors());
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(
    cors({
      origin: process.env.CLIENT_URI,
    })
  );
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorHandler);
app.use(unknownEndpoints);

app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  );
});
