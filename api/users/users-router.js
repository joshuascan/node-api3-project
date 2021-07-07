const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((name) => {
      res.status(201).json(name);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    await Users.remove(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  Posts.insert({ text: req.body.text, user_id: req.params.id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
});

module.exports = router;
