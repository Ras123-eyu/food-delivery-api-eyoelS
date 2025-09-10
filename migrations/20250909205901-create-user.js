"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("customer", "admin"),
      defaultValue: "customer",
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
  await queryInterface.dropTable("Users");
}
