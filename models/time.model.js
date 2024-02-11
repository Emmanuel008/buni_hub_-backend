module.exports = (sequelize, DataTypes) => {
    const SignIn = sequelize.define("signin", {
      signin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      signInTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    });
    return SignIn;
};