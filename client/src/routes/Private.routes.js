import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo } = userAuthData;
  return (
    <Route
      render={(props) =>
        !userInfo ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoutes;
