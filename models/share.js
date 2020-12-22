module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('share', {
    },{
        underscored:true
    })
}