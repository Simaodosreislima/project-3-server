const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MatchSchema = new Schema(
  {
    userOne: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    userTwo: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    messages: [{ type: Schema.Types, ObjectId, ref: "Messages" }]
  },
  {
    timestamps: true,
  }
);

const Match = model("Match", MatchSchema);
module.exports = Match;