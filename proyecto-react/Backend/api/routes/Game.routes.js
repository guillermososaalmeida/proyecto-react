const { isAuth } = require("../../middleware/auth.middleware");
const { uploadGame } = require("../../middleware/files.middleware");
const {
  postGame,
  getById,
  getByName,
  updateGame,
  togglePlatform,
  deleteGame,
  getSkip,
  getAllGames,
  getPopularGames,
  getByGenre,
} = require("../controllers/Game.controller");

const GameRoutes = require("express").Router();

GameRoutes.post("/", [isAuth], uploadGame.single("image"), postGame);
GameRoutes.get("/:id", getById);
GameRoutes.get("/getByName/name", getByName);
GameRoutes.get("/get/all/skip", getSkip);
GameRoutes.get("/", getAllGames);
GameRoutes.patch(
  "/update/:id",
  [isAuth],
  uploadGame.single("image"),
  updateGame,
);
GameRoutes.patch("/toggle/:id", [isAuth], togglePlatform);
GameRoutes.get("/get/popular/games/sorted", getPopularGames);
GameRoutes.get("/get/games/by/genre/sorted", getByGenre);
GameRoutes.delete("/:id", [isAuth], deleteGame);

module.exports = GameRoutes;
