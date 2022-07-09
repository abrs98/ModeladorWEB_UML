const sequelize = require('../sequelize/sequelize');

module.exports = ({ logger, config }) => {
  if (config.db) {
    return sequelize({ config });
  }
  logger.error({
    message: 'Database config file log not found, disabling database.',
  });
  return false;
};
