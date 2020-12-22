module.exports = (sequelize, DataTypes) => {
    return sequelize.define('file', {
        name:DataTypes.STRING,
        link: DataTypes.STRING,
    }, {
        underscored: true
    })
}