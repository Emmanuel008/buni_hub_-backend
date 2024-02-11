
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("member", {
      membership_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{4}$/, // Ensure it's a four-digit number
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      }
    });

    return Member;
}