/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
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
  },
  down: async (queryInterface, Sequelize) => {
    const fks = await queryInterface.getForeignKeysForTables(['diagrams']);
    Object.entries(fks).forEach(async (entry) => {
      const [key, value] = entry;
      if (Array.isArray(value) && value.length > 0) {
        await queryInterface.removeConstraint(key, value[0]);
      }
    });
    await queryInterface.dropTable('projects');
  },
};
