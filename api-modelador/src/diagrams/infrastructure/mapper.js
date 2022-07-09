const Diagram = require('../domain/diagram');

class DiagramMapper {
  static toDomain(entity) {
    try {
      return Diagram({
        id: entity.id,
        userEmail: entity.userEmail,
        projectId: entity.projectId,
        name: entity.name,
        items: entity.items,
        // projects: entity.projects,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = DiagramMapper;
