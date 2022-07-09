module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'projects',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Project.associate = function (models) {
    this.belongsToMany(models.get('users'), {
      through: 'project_user',
      as: 'team',
      foreignKey: 'projectId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    this.hasMany(models.get('diagrams'), {
      as: 'diagrams',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    return this;
  };

  return Project;
};
