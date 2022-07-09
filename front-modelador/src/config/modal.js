import * as C from '@constants';

export const modal = [
  {
    parent: C.NAV_SAVE_DIAGRAM,
    type: C.MODAL_INPUT,
    data: {
      title: 'Name of new diagram',
      content: 'Please, enter a name of diagram',
      label: 'Name',
    },
  },
  {
    parent: C.NAV_NEW_DIAGRAM,
    type: C.MODAL_SIMPLE,
    data: {
      title: 'Do you want to create new diagram?',
      content: 'Any changes not saved will be lost!',
    },
  },
  {
    parent: C.MENU_SAVE_AS_TEMPLATE,
    type: C.MODAL_INPUT,
    data: {
      title: 'Name of new template',
      content: 'Please, enter a name of template',
      label: 'Name',
    },
  },
  {
    parent: C.PROJECTS_PANEL_ACTS_SAVEDIAGRAM,
    type: C.MODAL_INPUT,
    data: {
      title: 'Name of new diagram',
      content: 'Please, enter a name of diagram',
      label: 'Name',
    },
  },
];
