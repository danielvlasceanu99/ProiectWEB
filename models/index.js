const Sequelize = require('sequelize')
const db = require('../config/database')
const UsersModel = require('./user')
const NotesModel = require('./note')
const FilesModel = require('./file')
const SharesModel = require('./share')

const Users = UsersModel(db, Sequelize);
const Notes = NotesModel(db, Sequelize);
const Files = FilesModel(db, Sequelize);
const Shares = SharesModel(db, Sequelize);

Users.hasMany(Notes, {
    onDelete:"Cascade"
});
Notes.belongsTo(Users, {
    foreignKey: "userId"
})

Notes.hasMany(Files, {
    onDelete:"Cascade"
});
Files.belongsTo(Users, {
    foreignKey: "note_id"
})

module.exports = {
    Users,
    Notes,
    Files,
    Shares,
    connection: db
}