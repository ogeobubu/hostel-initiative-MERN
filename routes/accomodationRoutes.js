const express = require("express");
const router = express.Router();
const {
  create,
  getAllAccomodations,
  getAccomodation,
  updateAccomodation,
  deleteAccomodation,
} = require("../controllers/accomodation");
const auth = require("../middleware/auth.js");

router.post("/create", auth, create);
router.get("/", getAllAccomodations);
router.get("/:id", getAccomodation);
router.patch("/:id", auth, updateAccomodation);
router.delete("/:id", auth, deleteAccomodation);

module.exports = router;
