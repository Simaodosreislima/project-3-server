
require("dotenv/config");


require("./db");

const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const { isAuthenticated } = require('./middleware/jwt.middleware');
// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes)

const matchRoutes = require("./routes/match.routes");
app.use("/api", isAuthenticated, matchRoutes)

const messageRoutes = require("./routes/message.routes");
app.use("/api", isAuthenticated, messageRoutes);

const cors = require("cors");
app.use(cors());

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
