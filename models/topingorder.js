"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class topingorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topingorder.belongsTo(models.order, {
        as: "orders",
        foreignKey: {
          name: "idOrder",
        },
      });

      topingorder.belongsTo(models.toping, {
        as: "topings",
        foreignKey: {
          name: "idToping",
        },
      });
    }
  }
  topingorder.init(
    {
      idToping: DataTypes.INTEGER,
      idOrder: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "topingorder",
    }
  );
  return topingorder;
};
