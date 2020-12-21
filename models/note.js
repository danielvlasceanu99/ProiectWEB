module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('note', {
        title: DataTypes.STRING,
        subject: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        underscored:true
    })
}