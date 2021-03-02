import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Adminroutes = ({ component: Component, ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo } = userAuthData;
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Redirect to="/login" />
        ) : userInfo.role !== "admin" ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default Adminroutes;
