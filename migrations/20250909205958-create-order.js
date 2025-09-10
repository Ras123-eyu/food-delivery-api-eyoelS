"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Orders", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    restaurantId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Restaurants", key: "id" },
    },

    status: {
      type: Sequelize.ENUM("pending", "preparing", "delivered"),
      defaultValue: "pending",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Orders");
}
