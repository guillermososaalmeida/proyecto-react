const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlatformSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    devices: [
      {
        type: String,
        enum: [
          "PC",
          "Mac",
          "PlayStation 4",
          "PlayStation 5",
          "Xbox One",
          "Nintendo Switch",
          "Android",
        ],
      },
    ],
    developer: { type: String, default: "Unknown" },
    year: { type: Number, default: "Unknown" },
    programmed: { type: String, default: "Unknown" },
    image: { type: String },
    favUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Platform = mongoose.model("Platform", PlatformSchema);

module.exports = Platform;
