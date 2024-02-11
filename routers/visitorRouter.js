const {
  createVistor,
  getAllVisitor,
  deleteVisitorId,
  getTotalNumber,
} = require("../controllers/visitorController");

const router = require('express').Router();

router.post('/createVisitor', createVistor);
router.get('/getAllVisitor', getAllVisitor);
router.get("/getNumber", getTotalNumber);
router.delete('/deleteVisitor/:id', deleteVisitorId);
module.exports = router;