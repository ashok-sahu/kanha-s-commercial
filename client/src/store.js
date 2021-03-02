import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  userLogin,
  userRegister,
  forgotPassword,
  resetPassword,
} from "./reducers/userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userLogin: userLogin,
  userRegister: userRegister,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;
