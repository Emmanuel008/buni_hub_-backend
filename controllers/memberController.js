const db = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements
const { Op } = require("sequelize");
const Member = db.members;

exports.createMember = async (req, res) => {
  try {
    const { first_name, last_name, location, email, role, phoneNumber } =
      req.body;
    const emailCheck = await Member.findOne({ where: { email: email } });

    if (emailCheck) {
      return res
        .status(409)
        .json({ message: "User with given Email already exist" });
    }

    const password = last_name.toUpperCase();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    // Count the number of members registered this month
    const count = await Member.count({
      where: {
        membershipId: {
          [Sequelize.Op.startsWith]: `${formattedMonth}`,
        },
      },
    });

    // Ensure only 100 registrations per month
    if (count >= 100) {
      throw new Error("Monthly registration limit reached");
    }

    // Generate the MembershipId
    // Generate the MembershipId
    const nextNumber = count + 1;
    const formattedNextNumber =
      nextNumber < 10 ? `0${nextNumber}` : `${nextNumber}`;
    const membershipId = `${formattedMonth}${formattedNextNumber}`;

    const member = await Member.create({
      first_name,
      last_name,
      email,
      location,
      password: hashedPassword,
      membershipId,
      phoneNumber,
      role,
    });
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};


exports.verifyMemberDetails = async (req, res) => {
  try {
    const { first_name, last_name, email, role, location, phoneNumber } =
      req.body;

    const existingMember = await Member.findOne({
      where: {
        [Op.and]: [
          { first_name: first_name },
          { last_name: last_name },
          { email: email },
          { role: role },
          { location: location },
          { phoneNumber: phoneNumber },
        ],
      },
    });

    if (existingMember) {
      res.status(200).json({ message: "Member details verified successfully" });
    } else {
      res.status(404).json({ message: "Member details not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
