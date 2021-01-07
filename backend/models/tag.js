module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "tag",
    {
      name: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
};
