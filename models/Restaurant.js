import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

export default Restaurant;
