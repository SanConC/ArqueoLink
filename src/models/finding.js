const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Finding = sequelize.define(
  "Finding",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },

    title: { type: DataTypes.STRING(255), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },

    latitude: { type: DataTypes.DOUBLE, allowNull: true },
    longitude: { type: DataTypes.DOUBLE, allowNull: true },

    image_url: { type: DataTypes.STRING(255), allowNull: true },

    created_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "findings",
    timestamps: false,
  }
);

module.exports = Finding;