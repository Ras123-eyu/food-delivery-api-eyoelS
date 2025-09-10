"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("MenuItems", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      primaryKey: true,
    },
    restaurantId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Restaurants", key: "id" },
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
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
