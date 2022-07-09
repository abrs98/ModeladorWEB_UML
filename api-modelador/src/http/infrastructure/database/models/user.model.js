module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        //primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter a name',
          },
          len: {
            args: [1, 100],
            msg: 'Name length is not in this range',
          },
        },
      },
      email: {
        type: DataTypes.STRING(75),
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          notNull: {
            msg: 'Please enter an email',
          },
          len: {
            args: [1, 75],
            msg: 'Email length is not in this range',
          },
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  User.associate = function (models) {
    this.hasMany(models.get('diagrams'), {
      as: 'diagrams',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    this.hasMany(models.get('tdiagrams'), {
      as: 'tdiagrams',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    this.belongsToMany(models.get('projects'), {
      through: 'project_user',
      as: 'projects',
      sourceKey: 'email',
      foreignKey: 'userEmail',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    return this;
  };

  return User;
};
