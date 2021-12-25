const express = require("express");
const router = express.Router();
const {
  create,
  login,
  getAccessToken,
  getUser,
  updateUser,
  getUserAllAccomodations,
  accomodationUser,
  logout,
} = require("../controllers/user");
const auth = require("../middleware/auth.js");

router.post("/create", create);
router.post("/login", login);
router.get("/refresh_token", getAccessToken);
router.get("/", auth, getUser);
router.get("/:id", accomodationUser);
router.get("/id", auth, getUser);
router.patch("/", auth, updateUser);
router.get("/profile/:id", getUserAllAccomodations);
router.get("/logout", logout);

module.exports = router;
