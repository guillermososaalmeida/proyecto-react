const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { configCloudinary } = require("./middleware/files.middleware");
const { connect } = require("./utils/DB.JS");
const UserRoutes = require("./api/routes/User.routes");
const GameRoutes = require("./api/routes/Game.routes");
const PlatformRoutes = require("./api/routes/Platform.routes");

dotenv.config();

configCloudinary();

connect();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
//limitacion de datos
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//rutas
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/games", GameRoutes);
app.use("/api/v1/platforms", PlatformRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found ❌");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error 😯");
});

app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
