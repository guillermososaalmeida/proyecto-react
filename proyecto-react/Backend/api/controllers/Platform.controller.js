const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Game = require("../models/Game.model");
const Platform = require("../models/Platform.model");
const User = require("../models/User.model");

//! CREATE PLATFORM

const postPlatform = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    const { rol } = req.user;
    if (rol === "admin") {
      await Platform.syncIndexes();

      const newPlatform = new Platform(req.body);

      if (req.file) {
        newPlatform.image = catchImage;
      } else {
        newPlatform.image =
          "https://res.cloudinary.com/dluwybogp/image/upload/v1691762145/proyectoNodeNeoland/platformStorage/descarga_hw3o9x.png";
      }

      const savedPlatform = await newPlatform.save();

      if (savedPlatform) {
        return res.status(200).json(savedPlatform);
      } else {
        return res.status(404).json("Platform not saved in database");
      }
    } else {
      return res.status(403).json("You're not authorized");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImage);
    return next(error);
  }
};

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platformById = await Platform.findById(id);

    if (platformById) {
      return res.status(200).json({ data: platformById });
    } else {
      res.status(404).json("platform not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const platformByName = await Platform.find();
    const filterPlatform = platformByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterPlatform.length > 0) {
      return res.status(200).json({ data: filterPlatform });
    } else {
      res.status(404).json("platform not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET ALL
const getAllPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find();
    if (allPlatforms.length > 0) {
      return res.status(200).json({ data: allPlatforms });
    } else {
      res.status(404).json("platform not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! UPDATE PLATFORM
const updatePlatform = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    const { rol } = req.user;
    if (rol === "admin") {
      const { id } = req.params;

      const platformById = await Platform.findById(id);
      if (platformById) {
        const oldImg = platformById.image;
        const customBody = {
          _id: platformById._id,
          name: req.body?.name ? req.body?.name : platformById.name,
          image: req.file?.path ? req.file?.path : oldImg,
          developer: req.body?.developer
            ? req.body?.developer
            : platformById.developer,
          devices: req.body?.devices ? req.body?.devices : platformById.devices,
        };
        await Platform.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        const updatedNewPlatform = await Platform.findById(id);
        const keysUpdate = Object.keys(req.body);

        let test = {};
        keysUpdate.forEach((item) => {
          if (platformById[item] !== updatedNewPlatform[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }

          if (req.file) {
            updatedNewPlatform.image == req.file?.path
              ? (test = { ...test, file: true })
              : (test = { ...test, file: false });
          }
        });

        if (req.body?._id) {
          test._id = "id cannot be changed";
        }

        let acc = 0;
        for (let key in test) {
          if (test[key] == false) acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: "some items have not updated",
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: updatedNewPlatform,
          });
        }
      } else {
        return res.status(404).json("platform not found");
      }
    } else {
      return res.status(403).json("You're not authorized");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! TOGGLE GAME
const toggleGame = async (req, res, next) => {
  try {
    const { rol } = req.user;
    if (rol === "admin") {
      let arrayGames;
      const { id } = req.params;
      const { games } = req.body;

      const platformById = await Platform.findById(id);

      if (platformById) {
        arrayGames = games.split(",");
        arrayGames.forEach(async (element) => {
          if (platformById.games.includes(element)) {
            try {
              await Platform.findByIdAndUpdate(id, {
                $pull: { games: element },
              });
              //?SOBRA?
              try {
                await Game.findByIdAndUpdate(element, {
                  $pull: { platforms: id },
                });
              } catch (error) {
                return res.status(404).json({
                  error: "error pulling platform from game model",
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(404).json({
                error: "error pulling game from platform model",
                message: error.message,
              });
            }
          } else {
            try {
              await Platform.findByIdAndUpdate(id, {
                $push: { games: element },
              });
              try {
                await Game.findByIdAndUpdate(element, {
                  $push: { platforms: id },
                });
              } catch (error) {
                return res.status(404).json({
                  error: "error pushing platform in game model",
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(404).json({
                error: "error pushing game in platform model",
                message: error.message,
              });
            }
          }
        });

        setTimeout(async () => {
          return res.status(200).json({
            update: await Platform.findById(id).populate({
              path: "games",
              populate: {
                path: "platforms",
              },
            }),
          });
        }, 500);
      } else {
        return res.status(404).json("platform not found");
      }
    } else {
      return res.status(403).json("You're not authorized");
    }
  } catch (error) {
    return next(error);
  }
};

//! SORT POPULAR PLATFORMS
const getPopularPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find();
    if (allPlatforms.length > 0) {
      const sortedPlatforms = allPlatforms.sort(
        (a, b) => b.customers.length - a.customers.length,
      );
      return res.status(200).json({ data: sortedPlatforms });
    } else {
      return res.status(404).json("platforms not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! SORT PLATFORMS BY NUMBER OF GAMES
const getAmountPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find();
    if (allPlatforms.length > 0) {
      const sortedPlatforms = allPlatforms.sort(
        (a, b) => b.games.length - a.games.length,
      );
      return res.status(200).json({ data: sortedPlatforms });
    } else {
      return res.status(404).json("platforms not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! SORT GAMES BY YEAR
const getNewGames = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platformToNewGames = await Platform.findById(id);

    if (platformToNewGames.games.length > 0) {
      try {
        const gamesToNew = [];
        for (let i = 0; i < platformToNewGames.games.length; i++) {
          let game = await Game.findById(platformToNewGames.games[i]);
          gamesToNew.push(game);
        }
        console.log(gamesToNew);

        const sortedNewGames = gamesToNew.sort((a, b) => b.year - a.year);

        console.log(sortedNewGames, "sorted");
        return res.status(200).json({ data: sortedNewGames });
      } catch (error) {
        res.status(404).json({ error: "not pushed", message: error.message });
      }
    } else {
      return res.status(404).json("platforms not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! DELETE PLATFORM
const deletePlatform = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { author } = req.body;
    const platformToDelete = await Platform.findById(id);
    const isAuthor = platformToDelete.author;
    const { image } = platformToDelete;
    const isAdmin = await User.findById(_id);
    if (isAdmin.rol === "admin" || isAuthor == author) {
      await Platform.findByIdAndDelete(id);

      try {
        await Game.updateMany({ platforms: id }, { $pull: { platforms: id } });
      } catch (error) {
        return res
          .status(404)
          .json(
            "error deleting platform in game while deleting platform",
            error.message,
          );
      }
      //?to do: borrar acquired de user
      /*  try {
        
      } catch (error) {
        
      } */
      if (await Platform.findById(id)) {
        return res.status(404).json("Pllatform not deleted");
      } else {
        deleteImgCloudinary(image);
        return res.status(200).json("Platform deleted");
      }
    } else {
      return res.status(404).json("You're not authorized");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postPlatform,
  getById,
  getByName,
  updatePlatform,
  toggleGame,
  deletePlatform,
  getAllPlatforms,
  getPopularPlatforms,
  getAmountPlatforms,
  getNewGames,
};
