const router = require("express").Router();
const User = require("../models/User.model");

router.put("/match/:id", async (req, res, next) => {


  const { id } = req.params
  const userId = req.payload._id

  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        matchSent: id
      }
    }, { new: true });

    const otherUser = await User.findById(id)

    if (otherUser.matchReceived.includes(userId)) {
      await User.findByIdAndUpdate(otherUser._id, {
        $pull: {
          matchReceived: userId
        },
        $push: {
          matches: userId
        }
      }, { new: true })
      await User.findByIdAndUpdate(userId, {
        $pull: {
          matchReceived: otherUser._id
        },
        $push: {
          matches: otherUser._id
        }
      }, { new: true })
    } else {
      await User.findByIdAndUpdate(id, {
        $push: {
          matchReceived: userId
        }
      }, { new: true })
    }
  } catch (error) {
    res.status(400).json({ errorMessage: "Error matching with User" });
  }
})


module.exports = router;