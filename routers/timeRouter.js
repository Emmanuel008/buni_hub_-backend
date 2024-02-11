const express = require("express");
const router = express.Router();
const {
  createSignInTime,
  getSignInTime,
} = require("../controllers/timeController");

router.post("/createtime", createSignInTime);
router.get("/gettime", getSignInTime);

module.exports = router;
