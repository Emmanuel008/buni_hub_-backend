const {
  createMember,
  verifyMemberDetails,
  getAllMember,
  getAllMemberAttendance,
  getMemberAttendance,
  deleteMember,
  updateMember,
  getTotalNumber
} = require("../controllers/memberController");

const router = require('express').Router();

router.post('/createMember', createMember);
router.post('/verifyMember', verifyMemberDetails);
router.get("/getAllMember", getAllMember);
router.get('/getAllMemberAttendance', getAllMemberAttendance);
router.get('/getMemberAttendance/:id', getMemberAttendance);
router.get("/getNumber", getTotalNumber);
router.put("/updateMember/:id", updateMember);
router.delete('/deleteMember/:id', deleteMember);
module.exports =router