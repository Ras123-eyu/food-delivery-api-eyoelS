"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("OrderItems", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      primaryKey: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Orders", key: "id" },
    },
    menuItemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "MenuItems", key: "id" },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 1 },
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
  await queryInterface.dropTable("MenuItems");
}
