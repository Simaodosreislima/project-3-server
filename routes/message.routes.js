const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Conversation.model");
const User = require("../models/User.model");
const Conversation = require("../models/Conversation.model");
const Message = require("../models/Message.model");



/* chat page  */
/* create a new chat */
router.post("/chat/create/:otherUserId", (req, res, next) => {
  const { otherUserId } = req.params
  const id = req.payload._id

  Conversation.findOne({ participants: { $all: [otherUserId, id] } })
    .then((foundConversation) => {
      if (foundConversation === null) {
        Conversation.create({ participants: [otherUserId, id] })
          /* .then((conversation) => {
            return User.findByIdAndUpdate(otherUserId, { $push: { conversation: conversation._id, } }) <--- here's the problem
            if I take it out a conversation is stored in MongoDb in the conversations folder. As soon as I add this, stops working and i can't 
            update the conversation array in the user

          }) */
          .then((conversation) => res.status(200).json(conversation))
          .catch(err => res.json(err));
      }
    });


  /* enter the chat already created  */   /* WORKING */
  router.get('/chat/:chatId', (req, res, next) => {
    const { chatId } = req.params;
    Conversation.findById(chatId)
      .populate('participants messages')
      .populate({
        path: 'messages',
        populate: {
          path: 'author',
          model: 'User',
        },
      })
      .then((chat) => res.status(200).json(chat))
      .catch((err) => res.json(err))
  })


  /* the name of the person who sent a message appears  */
  router.post('/chat/:chatId/message', (req, res, next) => {
    const { chatId } = req.params
    const { content } = req.body
    const id = req.payload._id

    Message.create({ content })
      .then((message) => {
        return Conversation.findByIdAndUpdate(chatId, { $push: { messages: message._id } })
      })
      .then((chat) => res.status(200).json(chat))
      .catch(err => next(err))
  })
})


module.exports = router;