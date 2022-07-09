import ControlIcon from '@assets/control.svg';
import BoundaryIcon from '@assets/boundary.svg';
import EntityIcon from '@assets/entity.svg';
import ActorIcon from '@assets/user.svg';
import ArrowIcon from '@assets/arrow.svg';
import LineIcon from '@assets/line.svg';
import * as C from '@constants';

export const nav0 = [

  {
    id: C.NAV_NEW_DIAGRAM,
    primaryText: 'New Diagram',
    icon: 'add',
    isSvg: false,
    hasOptions: false,
  },
  {
    id: C.NAV_OPEN_FILE,
    primaryText: 'Open File...',
    icon: 'cloud_download',
    isSvg: false,
    hasOptions: true,
    options: [
      { id: C.MENU_TEMPLATES, name: 'Template list' },
      { id: C.MENU_DIAGRAMS, name: 'Saved diagrams' },
    ],
  },
  {
    id: C.NAV_SAVE_DIAGRAM,
    primaryText: 'Save',
    icon: 'save',
    isSvg: false,
    hasOptions: false,
  },
  {
    id: C.NAV_SAVE_AS,
    primaryText: 'Save As...',
    icon: 'publish',
    isSvg: false,
    hasOptions: true,
    options: [
      { id: C.MENU_SAVE_AS_TEMPLATE, name: 'Template' },
      { id: C.MENU_SAVE_AS_JPG, name: 'Image low quality (JPG)' },
    ],
  },
  {
    id: C.NAV_MY_FILES,
    primaryText: 'My Projects',
    icon: 'folder',
    isSvg: false,
    hasOptions: false,
  },
  {
    id: C.NAV_CLOSE_WORK,
    primaryText: 'Close Diagram',
    icon: 'close',
    isSvg: false,
    hasOptions: false,
  },
];

export const nav1 = [
  {
    id: C.NAV_CONTROL,
    primaryText: 'Control',
    icon: ControlIcon,
    isSvg: true,
    hasOptions: false,
  },
  {
    id: C.NAV_BOUNDARY,
    primaryText: 'Boundary',
    icon: BoundaryIcon,
    isSvg: true,
    hasOptions: false,
  },
  {
    id: C.NAV_ENTITY,
    primaryText: 'Entity',
    icon: EntityIcon,
    isSvg: true,
    hasOptions: false,
  },
  {
    id: C.NAV_ACTOR,
    primaryText: 'Actor',
    icon: ActorIcon,
    isSvg: true,
    hasOptions: false,
  },
  {
    id: C.NAV_ASSOCIATION,
    primaryText: 'Association',
    icon: LineIcon,
    isSvg: true,
    hasOptions: false,
  },
  {
    id: C.NAV_ASSOCIATION_WITH,
    primaryText: 'Association with nav',
    icon: ArrowIcon,
    isSvg: true,
    hasOptions: false,
  },
];

export const extra = [
  {
    id: C.NAV_EXTRA_LOGOUT,
    primaryText: 'Logout',
    icon: 'exit_to_app',
    isSvg: false,
    hasOptions: false,
  },
];
