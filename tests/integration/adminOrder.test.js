import request from "supertest";
import app from "../../app";
import { sequelize, User, Restaurant, MenuItem, Order } from "../../models";
import { setup } from "../setup";

describe("Integration: Admin Update Order Status", () => {
  let token;
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    // Seed admin user, restaurant, menu item, and order
    await User.create({
      id: "adminId",
      name: "Admin",
      email: "admin@ex.com",
      password: "pass",
      role: "admin",
    });
    await Restaurant.create({
      id: "restId",
      name: "Test Restaurant",
      location: "123 Main St",
    });
    await MenuItem.create({
      id: "menuId",
      restaurantId: "restId",
      name: "Burger",
      price: 9.99,
    });
    await Order.create({
      id: "orderId",
      userId: "adminId",
      restaurantId: "restId",
      status: "pending",
    });

    // Login as admin
    const loginRes = await request(app)
      .post("/auth/login")
      .send({ email: "admin@ex.com", password: "pass" })
      .expect(200);
    token = loginRes.body.token;
  });

  it("should update order status as admin", async () => {
    await request(app)
      .patch("/orders/orderId/status")
      .set("Authorization", "Bearer ${token}")
      .send({ status: "preparing" })
      .expect(200);
  });
});
