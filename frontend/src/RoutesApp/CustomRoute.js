import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function CustomRoute({
  comp: Component,
  protect,
  auth,
  path,
  ...rest
}) {
  const { isAuth, user } = useContext(AuthContext);
  if (protect && !user?.token) {
    return isAuth && <Redirect to="/login" />;
  }
  if (!protect && user?.token) {
    if (auth) {
      return <Redirect to="/game" />;
    }
    return <Redirect to={path} />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
