const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);
module.exports = Message;