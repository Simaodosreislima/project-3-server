const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ConversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }]
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", ConversationSchema);
module.exports = Conversation;