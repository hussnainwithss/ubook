const { REACT_APP_IS_PRODUCTION, REACT_APP_API_URL, REACT_APP_SENTRY_URL } =
  process.env;
console.log(process.env);
export const IS_PRODUCTION = REACT_APP_IS_PRODUCTION === 'true';
export const API_BASE_PATH = REACT_APP_API_URL.toString();
export const SENTRY_URL = REACT_APP_SENTRY_URL.toString();
export const APP_NAME = 'UBook';
export const COOKIE_USER_TOKEN_FIELD = 'authToken';
