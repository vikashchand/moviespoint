const mongoose = require("mongoose");
const Playlist = require("./Playlist");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  playlists:[{type:String}]
});

module.exports = mongoose.model("User", userSchema);
