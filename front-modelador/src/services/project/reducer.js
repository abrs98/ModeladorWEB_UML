/* eslint-disable indent */
import * as T from '@services/project/actionsTypes';

const initialState = {
  projects: [],
  project: null,
  isLoading: false,
  error: null,
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case T.SET_PROJECTS:
      return { ...state, projects: payload.projects };
    case T.SET_PROJECT:
      return { ...state, project: payload.project };
    case T.LOCAL_CREATE_PROJECT:
      return { ...state, projects: [...state.projects, payload.project] };
    case T.LOCAL_UPDATE_PROJECT:
      let tempProjects = [...state.projects];
      let projectsUpdated = tempProjects.map((item) => {
        if (item.id === payload.id) {
          return { ...item, name: payload.name };
        }
        return item
      });
      return { ...state, projects: projectsUpdated };
    case T.LOCAL_REMOVE_PROJECT:
      tempProjects = [...state.projects];
      let indexToRemove = tempProjects?.findIndex((item) => item.id === payload.id);
      tempProjects?.splice(indexToRemove, 1);
      return { ...state, projects: tempProjects };
    case T.LOCAL_CREATE_DIAGRAM_IN_PROJECT:
      tempProjects = [...state.projects];
      projectsUpdated = tempProjects.map((project) => {
        if (project.id === payload.projectId) {
          const diagrams = [payload.diagram, ...project.diagrams];
          return { ...project, diagrams };
        }
        return project;
      });
      return { ...state, projects: projectsUpdated };
    case T.LOCAL_REMOVE_DIAGRAM_IN_PROJECT:
      tempProjects = [...state.projects];
      projectsUpdated = tempProjects.map((project) => {
        if (project.id === payload.projectId) {
          const diagrams = project.diagrams;
          return {
            ...project,
            diagrams: diagrams.filter((diagram) => diagram.id !== payload.diagramId)
          };
        }
        return project;
      });
      return { ...state, projects: projectsUpdated };

    // On pending
    case T.PROJECTS_PENDING:
    case T.PROJECT_PENDING:
    case T.CREATE_PROJECT_PENDING:
    case T.UPDATE_PROJECT_PENDING:
    case T.REMOVE_PROJECT_PENDING:
    case T.ADD_MEMBER_PENDING:
    case T.REMOVE_MEMBER_PENDING:
      return { ...state, isLoading: true, error: null };

    // On success
    case T.PROJECTS_RECEIVED:
      return {
        ...state,
        isLoading: false,
        projects: payload.projects,
        error: null,
      };
    case T.PROJECT_RECEIVED:
      return {
        ...state,
        isLoading: false,
        project: payload.project,
        error: null,
      };
    case T.CREATE_PROJECT_SUCCESS:
    case T.UPDATE_PROJECT_SUCCESS:
    case T.REMOVE_PROJECT_SUCCESS:
    case T.ADD_MEMBER_SUCCESS:
    case T.REMOVE_MEMBER_SUCCESS:
      return { ...state, isLoading: false, error: null };

    // On failed
    case T.PROJECTS_REQUEST_FAILED:
      return { projects: [], isLoading: false, error: payload.error };
    case T.PROJECT_REQUEST_FAILED:
      return { project: null, isLoading: false, error: payload.error };
    case T.CREATE_PROJECT_FAILED:
    case T.UPDATE_PROJECT_FAILED:
    case T.REMOVE_PROJECT_FAILED:
    case T.ADD_MEMBER_FAILED:
    case T.REMOVE_MEMBER_FAILED:
      return { ...state, isLoading: false, error: payload.error };

    default:
      return state;
  }
};

export default projectReducer;
