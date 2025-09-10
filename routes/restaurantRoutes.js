import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/resturantController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import cacheRestaurants from "../middlewares/cacheMiddleware.js";
const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), addRestaurant);
//router.get("/", cacheRestaurants, getAllRestaurants);
router.get("/:id", getRestaurant);
router.patch("/:id", authenticate, authorize(["admin"]), updateRestaurant);
router.delete("/:id", authenticate, authorize(["admin"]), deleteRestaurant);

export default router;
