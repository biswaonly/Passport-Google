import { USER_LOADED, LOGIN_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
