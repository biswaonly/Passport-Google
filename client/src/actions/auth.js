import axios from "axios";
import { USER_LOADED, LOGIN_FAIL, LOGOUT } from "./types";

// Login User
export const getUserData = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/user", {
      withCredentials: true
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// LOGOUT
export const logout = () => async dispatch => {
  try {
    await axios.get("http://localhost:5000/user/logout", {
      withCredentials: true
    });
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.error(err);
  }
};
