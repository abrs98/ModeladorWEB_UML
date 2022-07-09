import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { useAuth0, Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';

import { default as App } from '../App';
import { default as ProvidersContainer } from '../common/ProvidersContainer';
import 'jest-canvas-mock';

const mockStore = configureStore([]);

jest.mock('@auth0/auth0-react', () => {
  return {
    __esModule: true,
    useAuth0: () => {
      return {
        user: {},
        isAuthenticated: false,
        isLoading: false,
        error: null,
        getIdTokenClaims: () => {},
        getAccessTokenSilently: () => {},
        loginWithRedirect: () => {},
        logout: () => {},
      };
    },
    Auth0Provider: ({ children, ...rest }) => (
      <div>{children}</div>
    ),
    withAuthenticationRequired: jest.fn(),
  }
});

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      currentWork: {
        id: null,
        name: 'New diagram',
        items: [],
        isSaved: false,
      },
      diagram: {
        id: '',
        name: 'New diagram',
        diagrams: [],
        isSaved: false,
        isLoading: false,
        error: null,
      },
      guidelineProperties: {
        x0: 0,
        y0: 0,
        active: false,
      },
      itemProperties: {
        id: null,
        type: null,
        coords: { x: 0, y: 0 },
        connections: [],
        note: null,
        text: null,
        scale: 1.25,
        collision: {
          rectRound: 2,
          size: 40 * 1.25, // 40 * size
        },
        color: null,
        active: false,
        noteActive: false,
        textActive: false,
        ref: null,
        positionEl: null,
      },
      notification: {
        notifications: [],
      },
      project: {
        projects: [],
        isLoading: false,
        error: null,
      },
      template: {
        tdiagrams: [],
        isLoading: false,
        error: null,
      },
      ui: {
        // Tab
        tabIndex: 0,
        // Navbar
        navItemIndex: -1,
        navItemId: null,
        navManuItemId: null,
        navMenuActive: false,
        navMenuAnchorEl: null,
        // Modal
        modalParentId: null,
        modalOpen: false,
        modalType: null,
        modalData: null,
        // Canvas
        itemType: null,
        // Panel
        indexPanel: 0,
        // Extras
        isLoading: false,
        error: null,
      },
      user: {
        email: '',
        name: '',
        isLoading: false,
        error: null,
      },
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ProvidersContainer testStore={store}>
        <App />
      </ProvidersContainer>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
