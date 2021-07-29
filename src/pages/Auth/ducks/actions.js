import { AUTH_USER, SIGNOUT } from 'pages/Auth/ducks/action-types';
import { setUserToken } from 'utils/user';
import { authenticateUser, registerUser, updateProfile } from 'api';

export function setAuthUser(payload) {
  return { type: AUTH_USER, payload };
}

export function deleteUserInfo() {
  return { type: SIGNOUT };
}

export const authenticateUserAction = (username, password) => (dispatch) => {
  return authenticateUser(username, password)
    .then((resp) => {
      if (resp) {
        console.log(resp.data.token);
        dispatch(setAuthUser(resp.data));
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const registerUserAction =
  (email, password, firstName, lastName) => (dispatch) => {
    return registerUser(email, password, firstName, lastName)
      .then((resp) => {
        if (resp) {
          dispatch(setAuthUser(resp));
          setUserToken(resp);
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

export const updateProfileAction =
  (email, password, firstName, lastName) => (dispatch) => {
    return updateProfile(email, password, firstName, lastName)
      .then((resp) => {
        if (resp) {
          setUserToken(resp);
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
