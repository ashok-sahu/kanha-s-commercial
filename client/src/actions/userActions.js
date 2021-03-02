import axios from "axios";
import * as UserConstants from "../constants/userConstants";

export const Auth = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.USER_AUTH_START });
    const authData = {
      email,
      password,
    };
    await axios
      .post("http://localhost:9090/api/v1/auth/login", authData)
      .then((resp) => {
        const authData = resp.data.authData;
        const token = resp.data.token;

        const userInfo = {
          ...authData,
          token,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        dispatch({
          type: UserConstants.USER_AUTH_SUCCESS,
          payload: userInfo,
        });
      });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: UserConstants.USER_AUTH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.USER_REGISTER_START });
    const registerdata = {
      name,
      email,
      password,
    };
    await axios
      .post("http://localhost:9090/api/v1/auth/register", registerdata)
      .then((res) => {
        const consfirmMessage = res.data.message;
        dispatch({
          type: UserConstants.USER_REGISTER_SUCCESS,
          payload: consfirmMessage,
        });
      });
  } catch (error) {
    dispatch({
      type: UserConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const EmailVerification = (VerificationCode) => async (dispatch) => {
  try {
    dispatch({
      type: UserConstants.USER_AUTH_START,
    });
    const code = {
      VerificationCode,
    };

    await axios
      .post("http://localhost:9090/api/v1/auth/verifyEmail", code)
      .then((resp) => {
        console.log(resp);
      });
  } catch (error) {
    dispatch({
      type: UserConstants.USER_AUTH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const Logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: UserConstants.LOGOUT,
  });
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.FORGOT_PASSWORD_SEND_START });
    await axios
      .post("http://localhost:9090/api/v1/auth/forgotPassword", email)
      .then((resp) => {
        console.log(resp);
        const confirmMessage = resp.data.message;
        dispatch({
          type: UserConstants.FORGOT_PASSWORD_SEND_SUCCESS,
          payload: confirmMessage,
        });
      });
  } catch (error) {
    dispatch({
      type: UserConstants.FORGOT_PASSWORD_SEND_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};


export const resetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    dispatch({
      type: UserConstants.RESET_PASSWORD_START,
    });
    await axios
      .post("http://localhost:9090/api/v1/auth/resetPassword",resetPasswordData)
      .then((resp) => {
        console.log(resp);
        const confirmMessage = resp.data.message;
        dispatch({
          type: UserConstants.RESET_PASSWORD_SUCCESS,
          payload: confirmMessage,
        });
      });
  } catch (error) {
    dispatch({
      type: UserConstants.RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
