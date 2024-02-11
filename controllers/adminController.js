const db = require("../models");
const bcrypt = require("bcrypt");
const Admin = db.admins;
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements

exports.createAdmim = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if a record already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      // If a record exists, update it
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await existingAdmin.update({ username, hashedPassword });
      res.status(200).json(existingAdmin);
    } else {
      // If no record exists, create a new one
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newAdmin = await Admin.create({
        username,
        hashedPassword,
      });
      res.status(200).json(newAdmin);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCheck = await User.findOne({
      where: { username: username }
    });

    if (!userCheck) {
      return res.status(401).json({ message: "Invalid User Name or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userCheck.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid User Name or password" });
    }

    const userResponse = {
      id: userCheck.id,
      username: userCheck.username,
    };
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changeCredentials = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin with the default username
    const admin = await Admin.findOne({ where: { username: username } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update the admin's username and/or password
    if (username) {
      admin.username = username;
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      admin.password = hashedPassword;
    }

    // Save changes to the database
    await admin.save();

    res.status(200).json({ message: "Credentials updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
