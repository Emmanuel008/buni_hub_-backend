const db = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize, ARRAY } = require("sequelize");
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements
const { Op } = require("sequelize");
const Member = db.members;
const SignIn = db.signins;
const Attendance = db.attendances
const moment = require("moment");

exports.createMember = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    console.log(email);
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
        membership_id: {
          [Sequelize.Op.startsWith]: `${formattedMonth}`,
        },
      },
    });

    // Ensure only 100 registrations per month
    if (count >= 100) {
      throw new Error("Monthly registration limit reached");
    }

    // Generate the Membership_id

    const nextNumber = count + 1;
    const formattedNextNumber =
      nextNumber < 10 ? `0${nextNumber}` : `${nextNumber}`;
    const membership_id = `${formattedMonth}${formattedNextNumber}`;

    const member = await Member.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      membership_id: membership_id,
    });
    // Fetch the updated list of all members
    const allMembers = await Member.findAll({
      attributes: { exclude: ["password", "updatedAt"] },
    });

    res.status(200).json({
      message: "Member created successfully",
      newMember: member,
      allMembers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};


exports.verifyMemberDetails = async (req, res) => {
  try {
    let newTime;
    const { membership_id, password } = req.body;
    console.log(req.body)
    const existingMember = await Member.findOne({
      where: {
        membership_id: membership_id,
      },
    });


    if (!existingMember) {
      res.status(401).json({ message: "Member not found" });
    }
    // Validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingMember.password
    );
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Member_id  or password" });
    }
    else{
      const currentDate = new Date();
      newTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // checking if the member is late or not late
    const time = await SignIn.findOne();

    function compareTimestamps(timestamp1, timestamp2) {
      return timestamp1 > timestamp2;
    }
    const status = compareTimestamps(newTime, time.signInTime);
    const attendance = await Attendance.create({
      attendance_status: status,
      membership_id: existingMember.membership_id
    })
    if(attendance){
      res.status(200).json({ message: "Member verfication was succesfully" });
    }else{
      res.status(404).json({message: "Attendance could not be taken"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

exports.getAllMember = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const maxPageSize = 10;

    // Fetch the total number of users in the database
    const totalCount = await Member.count();

    // Calculate the dynamic pageSize based on total users
    const pageSize = Math.min(maxPageSize, totalCount);

    // Calculate the offset based on the requested page and dynamic pageSize
    const offset = (page - 1) * pageSize;
    const { count, rows: members } = await Member.findAndCountAll({
      attributes: [
        "membership_id",
        "first_name",
        "last_name",
        "email",
        [
          Sequelize.fn("date_format", Sequelize.col("createdAt"), "%Y-%m-%d"),
          "createdAt",
        ],
      ],
      limit: pageSize,
      offset,
      raw: true, // Ensure plain JSON objects are returned
    });

    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json({
      members,
      meta: {
        totalUsers: count,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    res.status(400).json({message: error})
  }
}

exports.getAllMemberAttendance = async (req, res) => {
  try {
    // const { page =1} = req.query;
    // const maxPageSize = 10;

    // Fetch today's date
    const todayDate = moment().format("YYYY-MM-DD");
    // console.log(moment(todayDate).startOf("day").toDate())
    // console.log(moment(todayDate).endOf("day").toDate())


    // Fetch the total number of members in the database
    // const totalCount = await Attendance.count();
    // console.log(totalCount);


    // Calculate the dynamic pageSize based on total users
    // const pageSize = Math.min(maxPageSize, totalCount);
    // console.log(pageSize);


    // Calculate the offset based on the requested page and dynamic pageSize
    // const offset = (page - 1) * pageSize;
    // console.log(offset);


    // Fetch the paginated users with attendance data for today's date
    const attendances = await Member.findAll({
      attributes: { exclude: ["updatedAt"] },
      // limit: pageSize,
      // offset,
      include: 
        {
          model: Attendance,
          required: true,
          attributes: ["createdAt"],
          where: {
            createdAt: {
              [Op.gte]: moment(todayDate).startOf("day").toDate(), // Greater than or equal to the start of today
              [Op.lt]: moment(todayDate).endOf("day").toDate(), // Less than the end of today
            },
          },
        },
      
    });
    console.log(attendances)

    const attendanceWithlocalTime = attendances.map(attendances =>{
      const localCreatedAt = attendances.attendances.map(att => att.createdAt.toLocaleString( {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
)

      return {
        ...attendances.toJSON(),
        time: localCreatedAt
      };
    });

    

    // const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({
      attendanceWithlocalTime,
      // meta: {
      //   totalUsers: count,
      //   totalPages,
      //   currentPage: parseInt(page),
      //   pageSize: parseInt(pageSize),
      // },
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getMemberAttendance = async (req, res) => {
  try {
    const { membership_id } = req.params;
    const member = await Member.findOne({
      where: {
        membership_id,
      },
      include: [
        {
          model: Attendance,
          attributes: ["attendance_status"],
        },
      ],
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const membership_id  = req.params.id;
    const member = await Member.findOne({
      where: {
        membership_id,
      },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.destroy();

    // Fetch the updated list of members after deletion
    const remainingMembers = await Member.findAll({
      attributes: { exclude: ["password", "updatedAt"] },
    });

    res.status(200).json({
      message: "Member deleted successfully",
      remainingMembers,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const membership_id = req.params.id;
    const {last_name} = req.body
    
    const member = await Member.findOne({
      where: {
        membership_id,
      },
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    if(last_name.length > 1){
      member.last_name = last_name;
      const password = last_name.toUpperCase();
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      member.password = hashedPassword; // Assuming uppercase of the new last name is the new password
    }

    // Update other changed fields
    await Member.update(req.body, {where: {membership_id: membership_id}});

    // Fetch the updated list of all members
    const allMembers = await Member.findAll({
      attributes: { exclude: ["password", "updatedAt"] },
    });

    res.status(200).json({
      message: "Member updated successfully",
      updatedMember: member,
      allMembers,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getTotalNumber = async (req,res) =>{
  try {
  const totalCount = await Member.count();
    res.status(200).json(totalCount)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}