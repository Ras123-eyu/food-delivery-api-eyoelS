import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const MenuItem = sequelize.define("MenuItem", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Restaurants", key: "id" },
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export default MenuItem;
