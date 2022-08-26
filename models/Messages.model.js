const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MessagesSchema = newSchema(
  {
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Messages = model("Messages", MessagesSchema);
module.exports = Messages;