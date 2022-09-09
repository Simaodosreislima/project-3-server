const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
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
    description: {
      type: String
    },
    profileVideos: {
      type: [String],
      default: "https://res.cloudinary.com/djcz0uyq9/video/upload/v1662037525/band-mate-project/video-name_ya6w1h.mp4",
    },
    spotifyAccessToken: { type: String },
    matchReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matchSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: Schema.Types.ObjectId, ref: "User" }],
    conversation: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
