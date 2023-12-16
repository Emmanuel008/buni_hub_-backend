
module.exports = (sequelize, DataTypes) => {
    const Member= sequelize.define("member", {
        membershipId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
            validate: {
              is: /^[0-9]{4}$/, // Ensure it's a four-digit number
            },
          },
        phoneNumber: {
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
          },
          location: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
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
          role: {
            type: DataTypes.STRING,
            allowNull: true
          }
        
    })

    return Member;
}