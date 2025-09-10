import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderItems,
} from "../controllers/orderController.js";
import {
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(authenticate);
router.post("/", authorize(["customer"]), placeOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.patch("/:id/status", authorize(["admin"]), updateOrderStatus);
router.delete("/:id", deleteOrder);
router.get("/:id/items", getOrderItems);
router.patch("/:id/items/:itemId", authorize(["customer"]), updateOrderItem);
router.delete("/:id/items/:itemId", authorize(["customer"]), deleteOrderItem);

export default router;
