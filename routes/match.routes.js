/* const router = require("express").Router();
const User = require("../models/User.model")

router.post("/match/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = req.payload._id;

  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        matchSent: id
      }
    })
  }


})

module.exports = router; */