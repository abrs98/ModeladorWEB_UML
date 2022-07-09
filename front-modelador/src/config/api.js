export const apiConfig = {
  baseURL: process.env.API_BASEURL,
  origin: process.env.API_ORIGIN,
  routes: {
    diagram: process.env.API_DIAGRAM_ROUTE,
    tdiagram: process.env.API_TDIAGRAM_ROUTE,
    user: process.env.API_USER_ROUTE,
    project: process.env.API_PROJECT_ROUTE,
  },
};

export default apiConfig;
