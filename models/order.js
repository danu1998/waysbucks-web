"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idTransaction",
        },
      });

      order.belongsTo(models.product, {
        as: "products",
        foreignKey: {
          name: "idProduct",
        },
      });

      order.hasMany(models.topingorder, {
        as: "topingorders",
        foreignKey: {
          name: "idOrder",
        },
      });
    }
  }
  order.init(
    {
      idTransaction: DataTypes.INTEGER,
      idProduct: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
