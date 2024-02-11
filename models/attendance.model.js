module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("attendance", {
      attendance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attendance_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      time:{
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW
      },
      membership_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "members", 
          key: "membership_id",
        },
      },
      
    });
    return Attendance;
}