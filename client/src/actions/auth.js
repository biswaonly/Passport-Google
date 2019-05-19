import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = () => async dispatch => {
  try {
    await axios.get('http://localhost:5000/auth/google');
    const res = await axios.get("http://localhost:5000/auth/google/callback");

    console.log("1 ===", res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log("2 ===", err);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// LOGOUT
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
