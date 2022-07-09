const Sequelize = require('sequelize');

module.exports = ({ config }) => {
  const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    { ...config.db }
  );

  const db = {
    sequelize,
    Sequelize,
    models: new Map(),
  };

  const dirs = [
    require('../database/models/diagram.model'),
    require('../database/models/tdiagram.model'),
    require('../database/models/user.model'),
    require('../database/models/project.model'),
    require('../database/models/projectUser.model'),
  ];

  dirs.forEach((file) => {
    const model = file(sequelize, Sequelize.DataTypes);
    db.models.set(model.name, model);
  });

  for (const [key, value] of db.models.entries()) {
    if ('associate' in value) {
      const associated = value.associate(db.models);
      db.models.set(key, associated);
    }
  }

  //db.sequelize.sync({ force: true });

  return db;
};
