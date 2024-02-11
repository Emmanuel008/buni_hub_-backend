module.exports = (sequelize, DataTypes) => {
    const Visitor = sequelize.define("visitor", {
      visitor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    return Visitor;
}