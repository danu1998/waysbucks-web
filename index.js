// Setting Server
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Port run on ${PORT} `));
// ==================== || ====================
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static("uploads"));
const router = require("./src/routes");
app.use("/api/v1/", router);
