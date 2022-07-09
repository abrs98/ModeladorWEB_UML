/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('project_user', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'projects',
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      userEmail: {
        type: Sequelize.STRING(75),
        references: {
          model: {
            tableName: 'users',
          },
          key: 'email',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
    await queryInterface.dropTable('project_user');
  },
};
