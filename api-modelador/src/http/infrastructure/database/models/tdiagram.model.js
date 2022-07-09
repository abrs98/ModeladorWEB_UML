module.exports = (sequelize, DataTypes) => {
  /**
   * This initializes the properties of the class, the following are
   * the properties:
   * ID     - This uses an id that will not be null, it will default value of
   *          uuidv4, it will be a primary key and its type will be uuid.
   * EMAIL  - This uses an email that mean who create the diagram that will not
   *          be null and its type will be string with a length of 75.
   * NAME   - This use a received diagram name that will not be null and its
   *          type will be string with a length of 50.
   * ITEMS  - This uses a received json that will contain the items of the
   *          diagram that will not be null and its type will be text.
   * NOTE: this is part of Sequelize lifecycle for more info read Sequelize
   * docs.
   */
  const TDiagram = sequelize.define(
    'tdiagrams',
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

  TDiagram.associate = function (models) {
    this.belongsTo(models.get('users'), {
      targetKey: 'email',
      foreignKey: 'userEmail',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    return this;
  };

  return TDiagram;
};
