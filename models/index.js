import { sequelize } from "../config/db.js";
import User from "./User.js";
import Restaurant from "./Restaurant.js";
import MenuItem from "./MenuItem.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Order, { foreignKey: "restaurantId" });
Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Order.hasMany(orderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
orderItem;

export { sequelize };
export { User, Restaurant, MenuItem, Order, OrderItem };
