const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { name, host } = db.connection;
    console.log(
      `conectade a la base de datos en el host: ${host} con el nombre: ${name} 😁`,
    );
  } catch (error) {
    console.log(`no se ha podido conectar a la base de datos 😢, ${error}`);
  }
};

module.exports = { connect };
