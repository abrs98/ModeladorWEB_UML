/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        //primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(75),
        primaryKey: true,
        allowNull: false,
        unique: true,
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
    const fks = await queryInterface.getForeignKeysForTables([
      'diagrams',
      'tdiagrams',
      'projects',
    ]);
    Object.entries(fks).forEach(async (entry) => {
      const [key, value] = entry;
      if (Array.isArray(value) && value.length > 0) {
        await queryInterface.removeConstraint(key, value[0]);
      }
    });
    await queryInterface.dropTable('users');
  },
};
