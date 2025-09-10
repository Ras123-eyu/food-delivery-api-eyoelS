import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
const placeOrder = async (req, res) => {
  const { restaurantId, items } = req.body;
  try {
    const order = await Order.create({
      userId: req.user.id,
      restaurantId,
    });
    const orderItems = items.map((item) => ({
      ...item,
      orderId: order.id,
    }));
    await OrderItem.bulkCreate(orderItems);
    res.status(201).json(order);
  } catch (error) {
    res.stayus(400).json({
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  let where = {};
  if (req.user.role !== "admin") where.userId = req.user.id;
  const orders = await Order.findAll({
    where,
  });
  res.json(orders);
};

const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).json({
      message: "order not found",
    });
  if (req.user.role !== "admin" && order.userId.toString() !== req.user.id)
    return res.status(403).json({
      message: "forbidden",
    });
  res.json(order);
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!order)
    return res.status(404).json({
      message: "order not found",
    });
  res.json(order);
};

const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).json({
      message: "order not found",
    });
  if (
    (req.user.role !== "admin" && order.userId.toString() !== req.user.id) ||
    order.status !== "pending"
  )
    return res.status(403).json({
      message: "forbidden",
    });
  await OrderItem.deleteMany({
    orderId: order._id,
  });
  await order.deleteOne();
  res.json({
    message: "Order deleted",
  });
};

const getOrderItems = async (req, res) => {
  const items = await OrderItem.find({
    orderId: req.params.id,
  });
  res.json(items);
};

export {
  placeOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderItems,
};
