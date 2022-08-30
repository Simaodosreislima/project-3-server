const router = require("express").Router();
const User = require("../models/User.model");

router.put("/match/:id", async (req, res, next) => {


  const { id } = req.params
  const userId = req.payload._id

  console.log(id)
  try {
    let currentUser = await User.findByIdAndUpdate(userId, {
      $push: {
        matchSent: id
      }
    }, { new: true });


    if (currentUser.matchReceived.includes(id)) {
      await User.findByIdAndUpdate(id, {
        $pull: {
          matchReceived: userId
        },
        $pull: {
          matchSent: userId
        },
        $push: {
          matches: userId
        }
      }, { new: true })

      await User.findByIdAndUpdate(userId, {
        $pull: {
          matchReceived: id
        },
        $pull: {
          matchSent: id
        },
        $push: {
          matches: id
        }
      }, { new: true })
    } else {
      await User.findByIdAndUpdate(id, {
        $push: {
          matchReceived: userId
        }
      }, { new: true })
    }

    res.status(200).json({ currentUser })
  } catch (error) {
    res.status(400).json({ errorMessage: "Error matching with User" });
  }
})


module.exports = router;