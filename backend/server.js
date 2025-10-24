require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tripRoutes = require("./routes/trips");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Batutta Board API is running...");
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/trips", tripRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "Connected to DB and server is listening on port",
        process.env.PORT || 4000
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });