const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv/config");
const userRoutes = require("./routes/userRoutes");
const accomodationRoutes = require("./routes/accomodationRoutes");
const app = express();
const path = require("path");

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/accomodations", accomodationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const connection_uri = process.env.DATABASE;
mongoose
  .connect(connection_uri)
  .then(() => {
    return console.log("MongoDB has successfully connected");
  })
  .catch((error) => {
    return console.log("MongoDB has failed to successfully connect.");
  });

const PORT = process.env.PORT || process.env.PORT_PATH;

app.listen(PORT, () => {
  return console.log(`Server running on port: ${PORT}`);
});
