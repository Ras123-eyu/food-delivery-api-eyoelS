import { User } from "../../models/User.js";
import { register } from "../../controllers/authController.js";
import sequelize from "../setup.js";

jest.mock("../../models");

describe("User Registration Unit Test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it("should register a new user", async () => {
    const req = {
      body: { name: "Test", email: "test@example.com", password: "pass" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.create = jest.fn().mockResolvedValue({
      id: "uuid",
      name: "Test",
      email: "test@example.com",
      role: "customer",
    });

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User registered" });
  });
});
