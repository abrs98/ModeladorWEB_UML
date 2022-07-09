/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diagrams', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.STRING(75),
        references: {
          model: {
            tableName: 'users',
          },
          key: 'email',
        },
        allowNull: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      projectId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'projects',
          },
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      items: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('diagrams');
  },
};
