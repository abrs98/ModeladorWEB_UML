const User = require('../domain/user');

class UserMapper {
  static toDomain(entity) {
    try {
      return User({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        diagrams: entity.diagrams,
        tdiagrams: entity.tdiagrams,
        projects: entity.projects,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = UserMapper;
