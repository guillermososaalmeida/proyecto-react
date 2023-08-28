const { isAuth } = require("../../middleware/auth.middleware");
const { uploadUser } = require("../../middleware/files.middleware");
const {
  register,
  checkNewUser,
  resendCode,
  login,
  autoLogin,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  toggleFavGame,
  addAcquiredGame,
  toggleFavPlatform,
  getAllUsers,
  getByName,
  getById,
  getPegi,
  getBestUser,
} = require("../controllers/User.controller");

const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", uploadUser.single("image"), register);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.get("/", getAllUsers);
UserRoutes.get("/getByName", getByName);
UserRoutes.get("/:id", getById);
UserRoutes.patch("/forgotpassword/forgotpassword", changePassword);
UserRoutes.patch("/sendPassword/:id", sendPassword);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch(
  "/update/update/:id",
  [isAuth],
  uploadUser.single("image"),
  update,
);
UserRoutes.patch("/toggleFavGame", [isAuth], toggleFavGame);
UserRoutes.patch("/toggleFavPlatform", [isAuth], toggleFavPlatform);

UserRoutes.delete("/", [isAuth], deleteUser);
UserRoutes.patch("/addAcquiredGame/add", [isAuth], addAcquiredGame);
UserRoutes.get("/get/pegi", [isAuth], getPegi);
UserRoutes.get("/get/users/more/games", getBestUser);

module.exports = UserRoutes;
