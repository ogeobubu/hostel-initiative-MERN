const express = require("express");
const router = express.Router();
const {
  create,
  login,
  getAccessToken,
  getUser,
  updateUser,
  getUserAllAccomodations,
} = require("../controllers/user");
const auth = require("../middleware/auth.js");

router.post("/create", create);
router.post("/login", login);
router.get("/refresh_token", getAccessToken);
router.get("/", auth, getUser);
router.patch("/", auth, updateUser);
router.get("/profile/:id", getUserAllAccomodations);

module.exports = router;
