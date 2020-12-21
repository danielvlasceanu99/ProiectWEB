module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('share', {
        note_id:DataTypes.INTEGER,
        user_id:DataTypes.INTEGER
    },{
        underscored:true
    })
}