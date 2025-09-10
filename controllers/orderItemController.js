import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const updateOrderItem = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (
    !order ||
    order.status !== "pending" ||
    order.userId.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const item = await OrderItem.findByIdAndUpdate(
    req.params.itemId,
    { quantity: req.body.quantity },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

const deleteOrderItem = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (
    !order ||
    order.status !== "pending" ||
    order.userId.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await OrderItem.findByIdAndDelete(req.params.itemId);
  res.json({ message: "Item deleted" });
};

export { updateOrderItem, deleteOrderItem };
