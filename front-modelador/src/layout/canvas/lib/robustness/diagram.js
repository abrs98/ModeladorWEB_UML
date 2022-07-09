import {
  CONTROL,
  BOUNDARY,
  ENTITY,
  ACTOR,
  ELEMENT,
  ASSOCIATION,
} from '@layout/canvas/lib/robustness/types';

/**
 * Items -> are elements, associations and misc.
 * Elements -> only are entity, control, boundary and actor.
 * Associations -> only are association with and without navigavility.
 * Misc. -> only is note.
 */

export class RobustnessAssociation {
  constructor(type, from, to) {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.type = type;
    this.coords = { x: 0, y: 0 };
    this.connections = [from?.id, to?.id];
    this.note = '';
    this.text = '';

    const rule1 = [ELEMENT.ACTOR, ELEMENT.BOUNDARY].indexOf(from?.type);
    const rule2 = [ELEMENT.ACTOR, ELEMENT.BOUNDARY].indexOf(to?.type);
    const rule3 = [ELEMENT.ENTITY, ELEMENT.CONTROL].indexOf(from?.type);
    const rule4 = [ELEMENT.ENTITY, ELEMENT.CONTROL].indexOf(to?.type);

    if (rule1 >= 0 && rule2 >= 0 && from?.type !== to?.type) {
      if (!from?.type?.includes(ELEMENT.ACTOR))
        this.connections = [to?.id, from?.id];
      this.type = ASSOCIATION.WITH_NAV;
    } else if (rule3 >= 0 && rule4 >= 0 && from?.type !== to?.type) {
      this.type = ASSOCIATION.SIMPLE;
    }
  }
}

export class RobustnessElement {
  constructor(type, coords) {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
    this.type = type;
    this.coords = { x: coords?.x, y: coords?.y };
    this.connections = [];
    this.note = '';
    this.text = type ? type?.charAt(0) + type?.slice(1).toLowerCase() : '';
  }
}

export const rules = ({ from, to }) => {
  let result = { isValid: false, msj: 'Select two elements to connect' };
  if (from.id && to.id) {
    const [type1, type2] = [from.type, to.type];
    if (from.id === to.id)
      return { ...result, msj: `Cannot connect ${type1} with itself` };
    if (from.connections?.includes(to.id))
      return { ...result, msj: 'The selected elements are already connected' };
    if (
      (type1 === ELEMENT.ACTOR && type2 === ELEMENT.BOUNDARY) ||
      (type2 === ELEMENT.ACTOR && type1 === ELEMENT.BOUNDARY) ||
      (type1 === ELEMENT.BOUNDARY && type2 === ELEMENT.CONTROL) ||
      (type2 === ELEMENT.BOUNDARY && type1 === ELEMENT.CONTROL) ||
      (type1 === ELEMENT.ENTITY && type2 === ELEMENT.CONTROL) ||
      (type2 === ELEMENT.ENTITY && type1 === ELEMENT.CONTROL) ||
      (type1 === ELEMENT.CONTROL && type2 !== ELEMENT.ACTOR) ||
      (type2 === ELEMENT.CONTROL && type1 !== ELEMENT.ACTOR)
    ) {
      return { isValid: true, msj: null };
    }
    return { ...result, msj: `Cannot connect ${type1} with ${type2}` };
  }
  return result;
};
