const db = require("../models");
const Visitor = db.visitors;

exports.createVistor = async (req, res) => {
  try {
    const { first_name, last_name, email, role, phone_number } = req.body;
    const visitor = await Visitor.create({
      first_name,
      last_name,
      email,
      role,
      phone_number,
    });
    res.status(200).json(visitor);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// get all data
exports.getAllVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findAll();
    res.status(200).json(visitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVisitorId = async (req, res) => {
  try {
    const visitor = await Visitor.destroy({
      where: { visitor_id: req.params.id },
    });
    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTotalNumber = async (req, res) => {
  try {
    const totalCount = await Visitor.count();
    res.status(200).json(totalCount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};