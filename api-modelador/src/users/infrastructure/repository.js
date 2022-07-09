const Mapper = require('./mapper');
const RepositoryError = require('./repositoryError');

class UserRepository {
  constructor({ model }) {
    this.model = model;
  }

  create(...args) {
    return this.model
      .create(...args)
      .then(({ dataValues }) => Mapper.toDomain({ ...dataValues }))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  find(...args) {
    return this.model
      .findAll(...args)
      .then((entity) =>
        entity.map(({ dataValues, diagrams, tdiagrams, projects }) =>
          Mapper.toDomain({ ...dataValues, diagrams, tdiagrams, projects })
        )
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  /** NOT USED **/
  findByPk(...args) {
    return this.model
      .findByPk(...args)
      .then((entity) =>
        entity.map(({ dataValues, diagrams, tdiagrams, projects }) =>
          Mapper.toDomain({ ...dataValues, diagrams, tdiagrams, projects })
        )
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  /** NOT USED **/
  findOne(...args) {
    return this.model
      .findOne(...args)
      .then(({ dataValues, diagrams, tdiagrams, projects }) =>
        Mapper.toDomain({ ...dataValues, diagrams, tdiagrams, projects })
      )
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

  /********** FOR DEBUG **********/
  findAll(...args) {
    return this.model
      .findAll(...args)
      .then((entity) =>
        entity.map(({ dataValues, diagrams, tdiagrams, projects }) =>
          Mapper.toDomain({ ...dataValues, diagrams, tdiagrams, projects })
        )
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

module.exports = UserRepository;
