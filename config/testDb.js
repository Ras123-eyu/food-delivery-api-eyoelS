import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",
  logging: false,
});

export default sequelize;
