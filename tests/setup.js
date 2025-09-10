import Sequelize from "sequelize";
import {
  User,
  MenuItem,
  Order,
  OrderItem,
  Restaurant,
  sequelize,
} from "../models";

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  });
});

afterAll(async () => {
  await sequelize.close();
});

export default { sequelize };
