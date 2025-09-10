import { DataTypes } from "sequelize";

import { sequelize } from "../config/db.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Restaurants", key: "id" },
  },

  status: {
    type: DataTypes.ENUM("pending", "preparing", "delivered"),
    defaultValue: "pending",
  },
});

export default Order;
