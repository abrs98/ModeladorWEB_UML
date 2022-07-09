module.exports = (sequelize, DataTypes) => {
  const Diagram = sequelize.define(
    'diagrams',
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
      /*projectId: {
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
      },*/
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter a name',
          },
          len: {
            args: [1, 50],
            msg: 'String length is not in this range',
          },
        },
      },
      items: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      /*hooks: {
        beforeCreate: (diagram) => {
          diagram.items = JSON.stringify(diagram.items);
        },
      },*/
      freezeTableName: true,
      timestamps: true,
    }
  );

  Diagram.associate = function (models) {
    this.belongsTo(models.get('users'), {
      //targetKey: 'email',
      foreignKey: 'userEmail',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    /*this.belongsTo(models.get('projects'), {
      foreignKey: 'projectId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });*/
    return this;
  };

  return Diagram;
};
