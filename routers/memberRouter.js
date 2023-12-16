const {createMember, verifyMemberDetails} = require("../controllers/memberController")

const router = require('express').Router();

router.post('/createMember', createMember);
router.post('/verifyMember', verifyMemberDetails)

module.exports =router