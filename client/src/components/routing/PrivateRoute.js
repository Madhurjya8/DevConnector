import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    props.children
  );
};

export default PrivateRoute;
