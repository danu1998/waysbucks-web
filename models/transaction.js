"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      transaction.hasMany(models.order, {
        as: "orders",
        foreignKey: {
          name: "idTransaction",
        },
      });
    }
  }
  transaction.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      postcode: DataTypes.STRING,
      income: DataTypes.STRING,
      status: DataTypes.STRING,
      imgpay: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
