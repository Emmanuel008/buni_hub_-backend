const dbConfig = require("../config/dbConfig.js");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, { 
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require("./member.model.js")(sequelize, DataTypes)
db.signins = require("./time.model.js")(sequelize, DataTypes)
db.visitors = require("./visitor.model.js")(sequelize,DataTypes)
db.attendances = require("./attendance.model.js")(sequelize, DataTypes);
db.admins = require("./admin.model.js")(sequelize, DataTypes);

// all associations

db.members.hasMany(db.attendances, { foreignKey: "membership_id" });
db.attendances.belongsTo(db.members, { foreignKey: "membership_id" });

// db.members.hasMany(db.attendances, { foreignKey: "last_name" });
// db.attendances.belongsTo(db.members, { foreignKey: "last_name" });

db.sequelize.sync({force: false}).then(() => {})
.then(() => {
    console.log("Yes re-sync done.");
});

module.exports = db;