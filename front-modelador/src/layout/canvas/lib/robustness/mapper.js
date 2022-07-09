class RobustnessItemMapper {
  static toDTO(entity) {
    try {
      return {
        id: entity?.id,
        type: entity?.type,
        coords: entity?.coords,
        connections: entity?.connections,
        note: entity?.note,
        text: entity?.text,
      };
    } catch (err) {
      return null;
    }
  }
}

export default RobustnessItemMapper;
