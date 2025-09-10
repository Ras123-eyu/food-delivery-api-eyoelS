import request from "supertest";
import app from "../../app";
import { sequelize, User, Restaurant, MenuItem } from "../../models";
import { setup } from "../setup";

describe("Integration: Register -> Login -> Place Order", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await Restaurant.create({
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Test Restaurant",
      location: "123 Main St",
    });
    await MenuItem.create({
      id: "123e4567-e89b-12d3-a456-426614174001",
      restaurantId: "123e4567-e89b-12d3-a456-426614174000",
      name: "Burger",
      price: 9.99,
    });
  });

  it("should register, login, and place order", async () => {
    await request(app)
      .post("/auth/register")
      .send({ name: "Test", email: "test@ex.com", password: "pass" })
      .expect(201);

    const loginRes = await request(app)
      .post("/auth/login")
      .send({ email: "test@ex.com", password: "pass" })
      .expect(200);
    const token = loginRes.body.token;

    await request(app)
      .post("/orders")
      .set("Authorization", "Bearer ${token}")
      .send({
        restaurantId: "123e4567-e89b-12d3-a456-426614174000",
        items: [
          { menuItemId: "123e4567-e89b-12d3-a456-426614174001", quantity: 2 },
        ],
      })
      .expect(201);
  });
});
