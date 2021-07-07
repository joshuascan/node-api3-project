const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(
    `Method: ${req.url}\nURL: http://localhost:4000${
      req.url
    }\nTimestamp: ${Date.now()}\n`
  );
  next();
}

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: "user not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const validatePost = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const errorHandling = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message,
  });
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling,
};
