const router = require("express").Router();
const {createAdmim, loginAdmin, changeCredentials} = require("../controllers/adminController");


router.post("/register", createAdmim);
router.post("/login", loginAdmin);
router.put("/changeCredentials", changeCredentials);

module.exports = router;