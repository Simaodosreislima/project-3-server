const router = require("express").Router();
const User = require("../models/User.model");

router.post("/user", (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;

  User.create({ email, password, username, firstName, lastName })
    .then(response => res.json(response))
    .catch(err => res.json(err));

})

module.exports = router;