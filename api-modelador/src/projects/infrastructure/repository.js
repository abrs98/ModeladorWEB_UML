const Mapper = require('./mapper');
const RepositoryError = require('./repositoryError');

class ProjectRepository {
  constructor({ model }) {
    this.model = model;
  }

  addMember(pk, userId) {
    return this.model
      .findByPk(pk)
      .then((entity) => (entity ? entity.addTeam(userId) : null))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  removeMember(pk, userId) {
    return this.model
      .findByPk(pk)
      .then((entity) => (entity ? entity.removeTeam(userId) : null))
      .then((result) => (result ? true : false))
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
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
        entity.map(({ dataValues, team, diagrams }) =>
          Mapper.toDomain({ ...dataValues, team, diagrams })
        )
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  findByPk(...args) {
    return this.model
      .findByPk(...args)
      .then(({ dataValues, team, diagrams }) =>
        Mapper.toDomain({ ...dataValues, team, diagrams })
      )
      .catch((err) => {
        throw new RepositoryError(err.message);
      });
  }

  findOne(...args) {
    return this.model
      .findOne(...args)
      .then(({ dataValues, team, diagrams }) =>
        Mapper.toDomain({ ...dataValues, team, diagrams })
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

  findAll(...args) {
    return this.model
      .findAll(...args)
      .then((entity) =>
        entity.map(({ dataValues, team, diagrams }) =>
          Mapper.toDomain({ ...dataValues, team, diagrams })
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

module.exports = ProjectRepository;
