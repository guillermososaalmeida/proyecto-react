const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
  //si no tenemos usuario o email lanzamos error
  if (!id || !email) {
    throw new Error("Email or id are missing 😶‍🌫️");
  }
  //Sign sirve para registrarnos y para añadirle la expiracion de 1 Día
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is missing 😶‍🌫️");
  }
  // llamamos a la funcion de verificar el token, que se encuentra en utils
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
