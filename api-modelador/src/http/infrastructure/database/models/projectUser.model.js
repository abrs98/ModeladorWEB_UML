module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define(
    'project_user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING(75),
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
        type: DataTypes.UUID,
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
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  ProjectUser.associate = function (models) {
    this.belongsTo(models.get('users'), {
      foreignKey: 'userEmail',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    this.belongsTo(models.get('projects'), {
      foreignKey: 'projectId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    return this;
  };

  return ProjectUser;
};
