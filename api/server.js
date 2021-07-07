const express = require("express");
const usersRouter = require("./users/users-router");
const { logger, errorHandling } = require("./middleware/middleware");

const server = express();

server.use(express.json());

server.use(logger);

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(errorHandling);

module.exports = server;
