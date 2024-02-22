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
    const visitors = await Visitor.findAll();

    // Convert createdAt timestamps to local time with custom format
    const visitorsWithLocalTime = visitors.map(visitor => {
      const localCreatedAt = visitor.createdAt.toLocaleString( {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      return {
        ...visitor.toJSON(),
        createdAt: localCreatedAt
      };
    });

    res.status(200).json(visitorsWithLocalTime);
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