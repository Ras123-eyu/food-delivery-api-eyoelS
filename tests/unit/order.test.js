import { Order, OrderItem } from "../../models";
import { placeOrder } from "../../controllers/orderController";
import sequelize from "../setup";

jest.mock("../../models");

describe("Place Order Unit Test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it("should place a new order", async () => {
    const req = {
      user: { id: "userId" },
      body: {
        restaurantId: "restId",
        items: [{ menuItemId: "itemId", quantity: 2 }],
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Order.create = jest.fn().mockResolvedValue({ id: "orderId" });
    OrderItem.bulkCreate = jest.fn().mockResolvedValue([]);

    await placeOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
