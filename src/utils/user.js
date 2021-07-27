/**
 * user.js is used to manage the user information which stores in cookies
 */
import Cookies from 'universal-cookie';
import { COOKIE_USER_TOKEN_FIELD } from 'config';

export function setUserToken(payload, rememberMe) {
    const cookies = new Cookies();
    const date = new Date();
    const options = { path: '/', sameSite: 'strict' };
    options['expires'] = rememberMe
        ? new Date(date.setFullYear(date.getFullYear() + 1))
        : 0;
    cookies.set(COOKIE_USER_TOKEN_FIELD, payload, options);
}

export function getUserToken() {
    const cookies = new Cookies();
    return cookies.get(COOKIE_USER_TOKEN_FIELD);
}

export function deleteUserToken() {
    const cookies = new Cookies();
    cookies.remove(COOKIE_USER_TOKEN_FIELD, { path: '/' });
    console.log(cookies);
}
