const Project = require('../domain/project');

class ProjectMapper {
  static toDomain(entity) {
    try {
      return Project({
        id: entity.id,
        name: entity.name,
        team: entity.team,
        diagrams: entity.diagrams,
        // creator: entity.creator
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = ProjectMapper;
