const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const {
  getTestEmailSend,
  setTestEmailSend,
} = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const User = require("../models/User.model");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const nodemailer = require("nodemailer");
const randomPassword = require("../../utils/randomPassword");
const setError = require("../../helpers/handle-error");
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const BASE_URL_COMPLETE = `${BASE_URL}${PORT}`;
const validator = require("validator");
const Game = require("../models/Game.model");
const Platform = require("../models/Platform.model");

//! REGISTER
const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body;
    //aqui ponemos el email y el name por separado porque ambos son unique 💅, si no, {email:req.body.email, name:req.body.name}
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name },
    );

    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image =
          "https://res.cloudinary.com/dluwybogp/image/upload/v1690188399/Hub%20App/logoRotom_aprkjj.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            //si no dieramos feedback, el settimeout no nos haria falta
            if (getTestEmailSend()) {
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
          }, 1400);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exists");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! CHECK NEW USER
const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;

    //comprobamos si el usuario existe
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json("User not found");
    } else {
      if (confirmationCode === userExists.confirmationCode) {
        //si es igual ponemos check a true
        try {
          await userExists.updateOne({ check: true });
          //comprobamos que se haya actualizado
          const updateUser = await User.findOne({ email });

          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json("invalid code");
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, "General error check code"));
  }
};

//! RESEND CODE
const resendCode = async (req, res, next) => {
  try {
    //configuramos nodemailer para enviar el codigo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    //comprobamos que el user exista
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `Tu código es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//! LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      //comparamos la contraseña del body con la del user de la base de datos
      if (bcrypt.compareSync(password, userDB.password)) {
        //si coinciden, genermos el token
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! AUTOLOGIN
const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if ((password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! CAMBIO DE CONTRASEÑA ANTES DE ESTAR LOGADO
const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne({ email });
    if (userDb) {
      return res.redirect(
        307,
        `${BASE_URL_COMPLETE}/api/v1/users/sendPassword/${userDb._id}`,
      );
    } else {
      return res.status(404).json("User not registered");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    //generamos la password
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido tú, ponte en contacto con nuestro equipo, gracias.`,
    };

    //enviamos el email
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json("email not sent and user not updated");
      } else {
        console.log("Email sent: " + info.response);
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);
        try {
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
          const userUpdatePassword = await User.findById(id);
          //comprobamos que se haya actualizado
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! MODIFY PASSWORD
const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    const validated = validator.isStrongPassword(newPassword);
    if (validated) {
      if (bcrypt.compareSync(password, req.user.password)) {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

        try {
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
          const userUpdate = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            return res.status(200).json({
              updateUser: true,
            });
          } else {
            return res.status(200).json({
              updateUser: false,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json("passwords don't match");
      }
    } else {
      return res.status(404).json("password is not strong enough");
    }
  } catch (error) {
    return next(error);
  }
};

//! UPDATE
const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    const patchUser = new User(req.body);
    if (req.file) {
      patchUser.image = req.file.path;
    }

    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.email = req.user.email;

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) {
        deleteImgCloudinary(req.user.image);
      }

      const updateUser = await User.findById(req.user._id);
      const updateKeys = Object.keys(req.body);

      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({
              [item]: true,
            });
          } else {
            testUpdate.push({
              [item]: "same as before",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updateUser.image == req.file.path
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }
      return res.status(200).json({ updateUser, testUpdate });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! GET ALL
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      return res.status(200).json({ data: allUsers });
    } else {
      res.status(404).json("users not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY NAME
const getByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userByName = await User.find();
    const filterUser = userByName.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (filterUser.length > 0) {
      return res.status(200).json({ data: filterUser });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BY ID
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);

    if (userById) {
      return res.status(200).json({ data: userById });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! DELETE
const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    //delete users from platform model
    try {
      await Platform.updateMany(
        { favUsers: _id, customers: _id },
        { $pull: { favUsers: _id, customers: _id } },
      );
    } catch (error) {
      return res
        .status(404)
        .json(
          "error deleting users in platform while deleting user",
          error.message,
        );
    }

    try {
      await Game.updateMany(
        { players: _id, favUsers: _id },
        { $pull: { players: _id, favUsers: _id } },
      );
    } catch (error) {
      return res
        .status(404)
        .json(
          "error deleting users in game while deleting user",
          error.message,
        );
    }

    if (await User.findById(_id)) {
      return res.status(404).json("User not deleted");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("User deleted");
    }
  } catch (error) {
    return next(error);
  }
};

//! TOGGLE FAV GAME
const toggleFavGame = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { favGames } = req.body;
    const arrayFavGames = favGames.split(",");
    arrayFavGames.forEach(async (element) => {
      if (req.user.favGames.includes(element)) {
        // si lo incluye lo sacamos
        try {
          await User.findByIdAndUpdate(_id, {
            $pull: { favGames: element },
          });

          try {
            await Game.findByIdAndUpdate(element, {
              $pull: { favUsers: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "error pulling  fav user from game model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error pulling fav game from user model",
            element,
            message: error.message,
          });
        }
      } else {
        // si no lo incluye lo metemos
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { favGames: element },
          });
          try {
            await Game.findByIdAndUpdate(element, {
              $push: { favUsers: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "error pushing fav user  in game model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error pushing fav game in user model",
            element,
            message: error.message,
          });
        }
      }
    });

    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate({ path: "favGames" }));
    }, 1000);
  } catch (error) {
    return next(error);
  }
};

//! TOGGLE FAV PLATFORM

const toggleFavPlatform = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { favPlatforms } = req.body;
    const arrayFavPlatforms = favPlatforms.split(",");
    arrayFavPlatforms.forEach(async (element) => {
      if (req.user.favPlatforms.includes(element)) {
        // si lo incluye lo sacamos
        try {
          await User.findByIdAndUpdate(_id, {
            $pull: { favPlatforms: element },
          });

          try {
            await Platform.findByIdAndUpdate(element, {
              $pull: { favUsers: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "error pulling  fav user from platform model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error pulling fav platform from user model",
            element,
            message: error.message,
          });
        }
      } else {
        // si no lo incluye lo metemos
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { favPlatforms: element },
          });
          try {
            await Platform.findByIdAndUpdate(element, {
              $push: { favUsers: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "error pushing fav user  in platform model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "error pushing fav platform in user model",
            element,
            message: error.message,
          });
        }
      }
    });

    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("favPlatforms"));
    }, 1500);
  } catch (error) {
    return next(error);
  }
};

//! ADD ACQUIRED GAME
//solo para añadir juegos comprados

const addAcquiredGame = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { game } = req.body;
    const { platform } = req.body;

    const gameExists = (await Game.find()).some(({ _id }) => _id == game);
    const platformExists = (await Platform.find()).some(
      ({ _id }) => _id == platform,
    );
    const isPlatformInGame = async (id) => {
      const gameCheck = await Game.findById(id);
      console.log(gameCheck.platforms.includes(platform));
      return gameCheck.platforms.includes(platform);
    };

    //funcion para comprobar si la plataforma está disponible en el juego

    //compruebo si existen los juegos/plataformas
    if (gameExists && platformExists) {
      //compruebo si la plataforma está disponible
      if (await isPlatformInGame(game)) {
        //compruebo si el user ya tiene algún juego, si no, lo meto directamente
        if (req.user.acquired.length !== 0) {
          //si ya tiene algún juego, compruebo que tenga este juego o no
          const hasGame = req.user.acquired.some(
            ({ gameId }) => gameId == game,
          );

          if (!hasGame) {
            //si no tiene este juego, lo meto entero
            try {
              await User.findByIdAndUpdate(_id, {
                $push: { acquired: { platformsId: [platform], gameId: game } },
              });
              const gameToCheck = await Game.findById(game);
              if (!gameToCheck.players.includes(_id)) {
                try {
                  await Game.findByIdAndUpdate(game, {
                    $push: { players: _id },
                  });
                } catch (error) {
                  return res.status(404).json({
                    error: "error pushing player in game model",
                    message: error.message,
                  });
                }
              }
              const platformToCheck = await Platform.findById(platform);
              if (!platformToCheck.customers.includes(_id)) {
                try {
                  await Platform.findByIdAndUpdate(platform, {
                    $push: { customers: _id },
                  });
                } catch (error) {
                  return res.status(404).json({
                    error: "error pushing user in platform model",
                  });
                }
              }
            } catch (error) {
              return res.status(404).json({
                error: "error acquiring new game",
                message: error.message,
              });
            }
          } else {
            //si sí que tiene este juego, compruebo si lo tiene en la misma plataforma o es otra
            const patchUser = req.user;
            const patchGame = patchUser.acquired.find(
              ({ gameId }) => gameId == game,
            );
            if (!patchGame.platformsId.includes(platform)) {
              patchGame.platformsId.push(platform);
              try {
                await User.findByIdAndUpdate(req.user._id, patchUser);
              } catch (error) {
                return res.status(404).json({
                  error: "error pushing new platform in game",
                  message: error.message,
                });
              }
            } else {
              //si es el primer juego, lo meto directamente
              try {
                await User.findByIdAndUpdate(_id, {
                  $pull: { acquired: { platformsId: platform, gameId: game } },
                });
                try {
                  await Game.findByIdAndUpdate(game, {
                    $pull: { players: _id },
                  });
                } catch (error) {
                  return res.status(404).json({
                    error: "error pulling player from game model",
                    message: error.message,
                  });
                }
                try {
                  await Platform.findByIdAndUpdate(platform, {
                    $pull: { customers: _id },
                  });
                } catch (error) {
                  return res.status(404).json({
                    error: "error pulling user from platform model",
                  });
                }
              } catch (error) {
                return res.status(404).json({
                  error: "error pulling game from user",
                  message: error.message,
                });
              }
            }
          }
        } else {
          //si no hay ninguno metido, lo metes sí o sí

          try {
            await User.findByIdAndUpdate(_id, {
              $push: { acquired: { platformsId: platform, gameId: game } },
            });
            try {
              await Game.findByIdAndUpdate(game, {
                $push: { players: _id },
              });
            } catch (error) {
              return res.status(404).json({
                error: "error pushing player in game model",
                message: error.message,
              });
            }
            try {
              await Platform.findByIdAndUpdate(platform, {
                $push: { customers: _id },
              });
            } catch (error) {
              return res.status(404).json({
                error: "error pushing user in platform model",
              });
            }
          } catch (error) {
            return res.status(404).json({
              error: "error pushing new game when is 0",
              message: error.message,
            });
          }
        }

        setTimeout(async () => {
          return res
            .status(200)
            .json(await User.findById(_id).populate("acquired"));
        }, 1400);
      } else {
        return res
          .status(404)
          .json("this game cannot be acquired in this platform");
      }
    } else {
      return res.status(404).json("game or platform not existing in database");
    }
  } catch (error) {
    return next(error);
  }
};

//! GET PEGI
const getPegi = async (req, res, next) => {
  try {
    const { year } = req.user;

    //función para conseguir la edad de un user
    const getAge = (year) => {
      const today = new Date();
      const thisYear = today.getFullYear();
      const age = thisYear - year;
      return age;
    };
    const age = getAge(year);
    const allGames = await Game.find();
    if (allGames.length > 0) {
      const pegiGames = allGames.filter((element) => element.pegi <= age);
      if (pegiGames.length > 0) {
        return res.status(200).json({ data: pegiGames });
      } else {
        return res.status(404).json("game not found");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//! GET BEST USER
//te da el usuario con más juegos comprados
const getBestUser = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      const sortedUsers = allUsers.sort(
        (a, b) => b.acquired.length - a.acquired.length,
      );
      return res.status(200).json({ data: sortedUsers[0] });
    } else {
      return res.status(404).json("users not found");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
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
  toggleFavPlatform,
  addAcquiredGame,
  getAllUsers,
  getByName,
  getById,
  getPegi,
  getBestUser,
};
