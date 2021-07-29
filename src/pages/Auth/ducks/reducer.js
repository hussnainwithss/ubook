import { AUTH_USER, SIGNOUT } from 'pages/Auth/ducks/action-types';

const initialState = { token: null, user: {}, isAuthenticated: false };

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      state = {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
      break;
    case SIGNOUT:
      state = initialState;
      break;
    default:
  }
  return state;
}

export default reducer;
