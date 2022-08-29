const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Conversation.model");
const User = require("../models/User.model");
const Conversation = require("../models/Conversation.model");
const Message = require("../models/Message.model");



/* chat page  */
/* create a new chat */
router.post("/chat/create/:otherUserId", async (req, res, next) => {
  try {
    const { otherUserId } = req.params
    const id = req.payload._id

    let checkConversation = await Conversation.findOne({ participants: { $all: [otherUserId, id] } })

    if (checkConversation === null) {
      let createdConversation = await Conversation.create({ participants: [otherUserId, id] })
      await User.findByIdAndUpdate(otherUserId, { $push: { conversation: createdConversation._id } })
      await User.findByIdAndUpdate(id, { $push: { conversation: createdConversation._id } })

      res.status(200).json(createdConversation)
    }
  } catch (error) {
    res.status(400).json({ errorMessage: "Error creating conversation" })
  }

  /* Conversation.findOne({ participants: { $all: [otherUserId, id] } })
    .then((foundConversation) => {
      if (foundConversation === null) {
        Conversation.create({ participants: [otherUserId, id] })
          .then((conversation) => {
            return User.findByIdAndUpdate(otherUserId, { $push: { conversation: conversation._id } }) 
          })

          .then((conversation) => res.status(200).json(conversation))
          .catch(err => res.json(err));
      }
    }); */



})
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

  Message.create({ content, author: id })
    .then((message) => {
      return Conversation.findByIdAndUpdate(chatId, { $push: { messages: message._id } })
    })
    .then((chat) => res.status(200).json(chat))
    .catch(err => next(err))
})


module.exports = router;