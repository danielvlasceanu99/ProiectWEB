module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
};
