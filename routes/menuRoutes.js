import express from "express";
import {
  addMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/:id/menu", authenticate, authorize(["admin"]), addMenuItem);
router.get("/:id/menu", getMenuItems);
router.get("/menu/:id", getMenuItem);
router.patch("/menu/:id", authenticate, authorize(["admin"]), updateMenuItem);
router.delete("/menu/:id", authenticate, authorize(["admin"]), deleteMenuItem);

export default router;
