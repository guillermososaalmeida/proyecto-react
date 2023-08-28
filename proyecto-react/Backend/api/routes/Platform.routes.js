const { isAuthAdmin } = require("../../middleware/auth.middleware");
const { uploadPlatform } = require("../../middleware/files.middleware");
const {
  postPlatform,
  getByName,
  getById,
  updatePlatform,
  toggleGame,
  deletePlatform,
  getAllPlatforms,
  getPopularPlatforms,
  getAmountPlatforms,
  getNewGames,
} = require("../controllers/Platform.controller");

const PlatformRoutes = require("express").Router();

PlatformRoutes.post(
  "/",
  [isAuthAdmin],
  uploadPlatform.single("image"),
  postPlatform,
);
PlatformRoutes.get("/:id", getById);
PlatformRoutes.get("/getByName/name", getByName);
PlatformRoutes.get("/", getAllPlatforms);
PlatformRoutes.patch(
  "/update/:id",
  [isAuthAdmin],
  uploadPlatform.single("image"),
  updatePlatform,
);
PlatformRoutes.patch("/toggle/:id", [isAuthAdmin], toggleGame);
PlatformRoutes.delete("/:id", [isAuthAdmin], deletePlatform);
PlatformRoutes.get("/get/popular/platforms/sorted", getPopularPlatforms);
PlatformRoutes.get("/get/platforms/by/amount/of/games", getAmountPlatforms);
PlatformRoutes.get("/get/sorted/games/by/year/new/newest/:id", getNewGames);

module.exports = PlatformRoutes;
