const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(
    `Method: ${req.method}\nURL: ${
      req.url
    }\nTimestamp: ${new Date().toLocaleString()}\n`
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

const validateUser = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    next({
      status: 400,
      message: "missing required name field",
    });
  }
};

const validatePost = (req, res, next) => {
  if (req.body.text) {
    next();
  } else {
    next({
      status: 400,
      message: "missing required text field",
    });
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
