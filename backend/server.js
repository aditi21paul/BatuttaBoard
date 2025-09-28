require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tripRoutes = require("./routes/trips");
// const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running !!!");
});

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/trips", tripRoutes);
// app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests once connected to db
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "Connected to DB and server is listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
