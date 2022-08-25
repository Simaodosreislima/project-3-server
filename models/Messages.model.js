const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MessagesSchema = newSchema(
  {
    text: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Messages = model("Messages", MessagesSchema);
module.exports = Messages;