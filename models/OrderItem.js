import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Orders", key: "id" },
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "MenuItems", key: "id" },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
});

export default OrderItem;
