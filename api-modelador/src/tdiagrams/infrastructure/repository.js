const Mapper = require('./mapper');
const RepositoryError = require('./repositoryError');

class TDiagramRepository {
  constructor({ model }) {
    this.model = model;
  }

  create(...args) {
    return this.model
      .create(...args)
      .then(({ dataValues }) => Mapper.toDomain(dataValues))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  find(...args) {
    return this.model
      .findAll(...args)
      .then((entity) =>
        entity.map(({ dataValues }) => Mapper.toDomain(dataValues))
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  findOne(...args) {
    return this.model
      .findOne(...args)
      .then(({ dataValues }) => Mapper.toDomain(dataValues))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  update(...args) {
    return this.model
      .update(...args)
      .then((updated) => (updated[0] ? true : false))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  delete(...args) {
    return this.model
      .destroy(...args)
      .then((deleted) => (deleted ? true : false))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  findAll(...args) {
    return this.model
      .findAll(...args)
      .then((entity) =>
        entity.map(({ dataValues }) => Mapper.toDomain(dataValues))
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  deleteAll() {
    return this.model
      .destroy({
        where: {},
        truncate: false,
      })
      .then((deleted) => (deleted ? true : false))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }
}

module.exports = TDiagramRepository;
