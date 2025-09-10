import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  authenticate,
  authorize,
  isOwnerOrAdmin,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(authenticate);
router.get("/", authorize(["admin"]), getAllUsers);
router.get("/:id", isOwnerOrAdmin, getUser);
router.patch("/:id", isOwnerOrAdmin, updateUser);
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
