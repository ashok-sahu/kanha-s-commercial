import * as UserConstants from "../constants/userConstants";

const initialState = {
  error: "",
  loading: false,
  userInfo: "",
  success: false,
  message: "",
};

export const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.USER_AUTH_START:
      return {
        loading: true,
      };
    case UserConstants.USER_AUTH_SUCCESS:
      return {
        userInfo: action.payload,
        success: true,
      };
    case UserConstants.USER_AUTH_FAIL:
      return {
        error: action.payload,
      };
    case UserConstants.RESET:
      return {};
    default:
      return state;
  }
};

export const userRegister = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.USER_REGISTER_START:
      return {
        loading: true,
      };
    case UserConstants.USER_REGISTER_SUCCESS:
      return {
        message: action.payload,
        success: true,
      };
    case UserConstants.USER_REGISTER_FAIL:
      return {
        error: action.payload,
      };
    case UserConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};


export const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.FORGOT_PASSWORD_SEND_START:
      return {
        loading: true,
      };
    case UserConstants.FORGOT_PASSWORD_SEND_SUCCESS:
      return {
        success: true,
        message: action.payload,
      };
    case UserConstants.FORGOT_PASSWORD_SEND_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.RESET_PASSWORD_START:
      return {
        loading: true,
      };
    case UserConstants.RESET_PASSWORD_SUCCESS:
      return {
        success: true,
        message: action.payload,
      };
    case UserConstants.RESET_PASSWORD_FAIL:
      return {
        error: action.payload,
      };
    case UserConstants.RESET_PASSWORD_RESET: {
      return;
    }
    default:
      return state;
  }
};
