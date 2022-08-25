const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      /*    default: "add path to cloudinary(?)" */
    },
    profileVideos: [String],
    spotifyAccessToken: { type: String },
    matchReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matchSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
