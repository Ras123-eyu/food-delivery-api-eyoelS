import dotenv from "dotenv";

import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants", menuRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
app.get("/", (req, res) => {
  res.send("Welcome to the food delivery System API");
});
export default app;
