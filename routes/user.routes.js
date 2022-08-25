const router = require("express").Router();
const User = require("../models/User.model");
const Match = require("../models/Match.model");

//Get all users
router.get("/user", (req, res, next) => {
  User.find()
    /*  .populate("matches") */
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err))
})
// Get specific user by his id 
router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    /*  .populate("tasks") */
    .then(user => res.status(200).json(user))
    .catch((err) => res.json(err))
})
//Edit user
router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { profileVideos, description, profileImg, firstName, lastName } = req.body;

  User.findByIdAndUpdate(userId, { profileVideos, description, profileImg, firstName, lastName }, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err))
})
//Delete user
router.delete("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .then(() => res.status(200).json({ message: `The project with id ${userId} was successfully deleted` })
    )
    .catch((err) => res.json)
})



module.exports = router;