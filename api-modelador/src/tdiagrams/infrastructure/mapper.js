const TDiagram = require('../domain/tdiagram');

class TDiagramMapper {
  static toDomain(entity) {
    try {
      return TDiagram({
        id: entity.id,
        userEmail: entity.userEmail,
        name: entity.name,
        items: entity.items,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      });
    } catch (err) {
      return null;
    }
  }
}

module.exports = TDiagramMapper;
