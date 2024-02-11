const db = require("../models");
const SignIn = db.signins;

exports.createSignInTime = async (req, res) => {
  try {
    const { signInTime } = req.body;
    console.log(signInTime);
    // Check if a record already exists
    const existingTimeEntry = await SignIn.findOne();

    if (existingTimeEntry) {
      // If a record exists, update it
      await existingTimeEntry.update({ signInTime });
      res.status(200).json(existingTimeEntry);
    } else {
      // If no record exists, create a new one
      const newTimeEntry = await SignIn.create({
        signInTime,
      });
      res.status(200).json(newTimeEntry);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getSignInTime = async (req, res) => {
  try {
    // Find the sign-in time
    const timeEntry = await SignIn.findOne();

    if (!timeEntry) {
      // Handle case where no sign-in time is found
      res.status(404).json({ message: "No sign-in time found." });
      return;
    }

    res.status(200).json(timeEntry);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
