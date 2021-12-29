const express = require("express");
const router = express.Router();
const { payment, getPayment } = require("../controllers/payment");
const auth = require("../middleware/auth.js");

router.post("/", auth, payment);
router.get("/", auth, getPayment);

module.exports = router;
