export const getAuthenticationStatus = (store) =>
  store && store.auth.isAuthenticated ? store.auth.isAuthenticated : false;

export const getAuthToken = (store) =>
  store && store.auth.token ? store.auth.token : null;

export const getAuthUser = (store) =>
  store && store.auth.user ? store.auth.user : {};
