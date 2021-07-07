function logger(req, res, next) {
  console.log(
    `Method: ${req.url}\nURL: http://localhost:4000${
      req.url
    }\nTimestamp: ${Date.now()}\n`
  );
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
