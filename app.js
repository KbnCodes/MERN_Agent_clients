const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authenticateToken = require("./middleware/auth");

require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/agencies", authenticateToken, agencyRoutes);
app.use("/client", authenticateToken, clientRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
